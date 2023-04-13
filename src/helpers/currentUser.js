const currentUser = async (endpoint, method = 'get', data = null) => {
  const user = JSON.parse(localStorage.getItem('current_user'));
  return user.user_id;
};

export default currentUser;
