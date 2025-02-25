const getCurrentUser = () => {
    // the the currently logged in user
    const user = Session.getActiveUser();
    const email = user.getEmail();//    const name = user.getName();

    return {email: email};
};

export { getCurrentUser };