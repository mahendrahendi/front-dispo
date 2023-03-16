const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  first_name: state => state.user.first_name,
  last_name: state => state.user.last_name,
  phone_number: state => state.user.phone_number,
  email: state => state.user.email,
  status: state => state.user.status,
  id: state => state.user.id,
  regNumber: state => state.user.regNumber,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}
export default getters
