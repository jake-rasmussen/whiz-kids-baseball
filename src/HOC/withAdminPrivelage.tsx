import Error from "next/error";
import Loading from "../components/LoadingPage";
import { api } from "../utils/api";

const withAdminPrivelage = (WrappedComponent: any) => {
  return function withAdminPrivelage(props: any) {
    const {
      data: isAdmin,
      isLoading,
      isError,
    } = api.user.isUserAdmin.useQuery();

    console.log("hi");

    if (isLoading) return <Loading />;
    else if (isError) return <Error statusCode={500} />;
    else if (!isAdmin) return <Error statusCode={403} />;
    else {
      return <WrappedComponent {...props} />;
    }
  };
};

export default withAdminPrivelage;
