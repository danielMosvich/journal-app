import { IconButton } from "@mui/material";
import JournalLayout from "../layout/JournalLayout";
import NoteView from "../view/NoteView";
import NothingSelectedView from "../view/NothingSelectedView";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
// import {savingNewNote} from "../../store/journal/journalSlice"
const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector((state) => state.journal);
  const onClickNewNote = () => {
    // dispatch(savingNewNote())
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      {active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.7 },
          ":active": { backgroundColor: "error.main", opacity: 1 },
          position: "fixed",
          bottom: 50,
          right: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

export default JournalPage;
