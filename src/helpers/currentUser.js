const currentUser = () => {
  const user = JSON.parse(localStorage.getItem('current_user'));
  console.log('user is here', user.user_id);
  return user.user_id;
};

export default currentUser;
