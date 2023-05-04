import Error from "next/error";
import { api } from "../utils/api";
import Loading from "../components/LoadingPage";

const withAdminPrivilege = (WrappedComponent: any) => {
  return function withAdminPrivilege(props: any) {
    const {
      data: isAdmin,
      isLoading,
      isError,
      error,
    } = api.user.isUserAdmin.useQuery();

    if (isLoading) return <Loading />;
    else if (isError)
      return <Error statusCode={error.data?.httpStatus || 500} />;
    else if (!isAdmin) return <Error statusCode={403} />;
    else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default withAdminPrivilege;
