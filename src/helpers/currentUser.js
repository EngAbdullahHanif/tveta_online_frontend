const currentUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user is here', user.user_id);
  return user.user_id;
};

export default currentUser;
