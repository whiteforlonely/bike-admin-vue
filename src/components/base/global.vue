<script>
const ACTION_HOST = 'http://localhost:9001';
// const ACTION_HOST = '';

const ACTION = {
  LOGIN: ACTION_HOST + '/login',
  REGISTER: ACTION_HOST + '/register',

  ADMIN_USER_LIST: ACTION_HOST + '/admin/user/list',
  ADMIN_USER_UPDATE: ACTION_HOST + '/admin/user/update',
  ADMIN_USER_DELETE: ACTION_HOST + '/admin/user/del',
  ADMIN_USER_ADD: ACTION_HOST + '/admin/user/add',
  ADMIN_USER_FORBID: ACTION_HOST + '/admin/user/forbid',
  ADMIN_USER_REUSE: ACTION_HOST + '/admin/user/reuse',
  ADMIN_USER_EXPORT: ACTION_HOST + '/admin/user/export',

  USER_UPDATE: ACTION_HOST + '/user/update',
  USER_LIST: ACTION_HOST + '/user/list',
  USER_DEL: ACTION_HOST + '/user/del',

  BIKE_ADD: ACTION_HOST + '/bike/add',
  BIKE_DEL: ACTION_HOST + '/bike/del',
  BIKE_UPDATE: ACTION_HOST + '/bike/update',
  BIKE_LIST: ACTION_HOST + '/bike/list',

  SITE_ADD: ACTION_HOST + '/site/add',
  SITE_DEL: ACTION_HOST + '/site/del',
  SITE_UPDATE: ACTION_HOST + '/site/update',
  SITE_LIST: ACTION_HOST + '/site/list'
};

const STRING_DEFINE = {
  ACCESS_USER: 'access-user',
  USER_TYPE: 'user-type',
  RESULT_SUCCESS: 'success'
};

export default{
  ACTION_HOST,
  ACTION,
  STRING_DEFINE
};
</script>
