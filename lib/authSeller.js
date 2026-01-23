import { currentUser } from "@clerk/nextjs/server";

const authSeller = async () => {
  try {
    const user = await currentUser();

    if (!user) return false;

    console.log("PUBLIC METADATA:", user.publicMetadata);

    return (
      String(user.publicMetadata?.role)
        .trim()
        .toLowerCase() === "seller"
    );
  } catch (error) {
    console.error("authSeller error:", error);
    return false;
  }
};

export default authSeller;
