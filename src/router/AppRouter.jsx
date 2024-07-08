import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import JournalRoutes from "../journal/routes/JournalRoutes";
import { ChekingAuth } from "../ui/componets/ChekingAuth";
import { useCheckAuth } from "../hooks";

const AppRouter = () => {
  const status  = useCheckAuth();
  if (status === "checking") {
    return <ChekingAuth />;
  }
  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<JournalRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
      {/* Login */}
      {/* Journal App */}
    </Routes>
  );
};

export default AppRouter;
