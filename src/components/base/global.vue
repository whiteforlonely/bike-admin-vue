<script>
// const ACTION_HOST = 'http://localhost:9000';
const ACTION_HOST = '';
const API_HOST = 'http://api.shengfyj.com/cp_service_api';

const ACTION = {
  LOGIN: ACTION_HOST + '/login',
  UPLOAD_BANNER_PIC: ACTION_HOST + '/pic/banner/upload',
  UPLOAD_LAUNCHER_PIC: ACTION_HOST + '/pic/launcher/upload',

  BANNER_LIST: ACTION_HOST + '/banner/list',
  BANNER_ADD: ACTION_HOST + '/banner/add',
  BANNER_UPDATE: ACTION_HOST + '/banner/update',
  BANNER_DEL: ACTION_HOST + '/banner/del',
  BANNER_ONLINE: ACTION_HOST + '/banner/online',
  BANNER_OFFLINE: ACTION_HOST + '/banner/offline',
  BANNER_EXPORT: ACTION_HOST + '/banner/export',

  LAUNCHER_PIC_LIST: ACTION_HOST + '/launcher/pic/list',
  LAUNCHER_PIC_ADD: ACTION_HOST + '/launcher/pic/add',
  LAUNCHER_PIC_UPDATE: ACTION_HOST + '/launcher/pic/update',
  LAUNCHER_PIC_DEL: ACTION_HOST + '/launcher/pic/del',
  LAUNCHER_PIC_ONLINE: ACTION_HOST + '/launcher/pic/online',
  LAUNCHER_PIC_OFFLINE: ACTION_HOST + '/launcher/pic/offline',
  LAUNCHER_PIC_EXPORT: ACTION_HOST + '/launcher/pic/export',

  ADMIN_USER_LIST: ACTION_HOST + '/admin/user/list',
  ADMIN_USER_UPDATE: ACTION_HOST + '/admin/user/update',
  ADMIN_USER_DELETE: ACTION_HOST + '/admin/user/del',
  ADMIN_USER_ADD: ACTION_HOST + '/admin/user/add',
  ADMIN_USER_FORBID: ACTION_HOST + '/admin/user/forbid',
  ADMIN_USER_REUSE: ACTION_HOST + '/admin/user/reuse',
  ADMIN_USER_EXPORT: ACTION_HOST + '/admin/user/export',

  PK10_MATCH_LIST: ACTION_HOST + '/pk10/match/list',
  PK10_MATCH_HAND_AWARD: ACTION_HOST + '/pk10/match/handaward',
  PK10_MATCH_AWARD_LIST: ACTION_HOST + '/pk10/match/award/list',
  PK10_MATCH_TICKET_AWARD: ACTION_HOST + '/pk10/match/ticket/award',
  PK10_MATCH_LIST_EXPORT: ACTION_HOST + '/pk10/match/list/export',

  WITHDRAW_LIST: ACTION_HOST + '/withdraw/list',
  WITHDRAW_APPLIED: ACTION_HOST + '/withdraw/applied',
  WITHDRAW_REAUTO: ACTION_HOST + '/withdraw/reauto',
  WITHDRAW_HAND: ACTION_HOST + '/withdraw/hand',
  WITHDRAW_REJECT: ACTION_HOST + '/withdraw/reject',
  WITHDRAW_EXPORT: ACTION_HOST + '/withdraw/export',

  ORDER_LIST: ACTION_HOST + '/order/list',
  ORDER_EXPORT: ACTION_HOST + '/order/export',
  ORDER_CANCEL: ACTION_HOST + '/order/cancel',
  ORDER_RECHARGE_PAY: ACTION_HOST + '/order/recharge/pay',
  ORDER_REFUND: ACTION_HOST + '/order/refund',
  ORDER_REJECT_REFUND: ACTION_HOST + '/order/rejectRefund',
  ORDER_TICKET_LIST: ACTION_HOST + '/order/ticket/list',
  ORDER_TICKET_EXPORT: ACTION_HOST + '/order/ticket/export',

  VIP_USER_LIST: ACTION_HOST + '/vip/user/list',
  VIP_ORDER_LIST: ACTION_HOST + '/vip/order/list',
  VIP_PAY_DETAIL: ACTION_HOST + '/vip/pay/detail',
  VIP_USER_DETAIL: ACTION_HOST + '/vip/user/detail',
  VIP_USER_DELETE: ACTION_HOST + '/vip/user/del',
  VIP_USER_FORBID: ACTION_HOST + '/vip/user/forbid',
  VIP_USER_RELEASE: ACTION_HOST + '/vip/user/release',
  VIP_USER_UPDCERTIFICATION: ACTION_HOST + '/vip/user/updCertification',
  VIP_USER_PAY_EXPORT: ACTION_HOST + '/vip/user/pay/export',
  VIP_USER_EXPORT: ACTION_HOST + '/vip/user/export',

  OPEN_BIND_WX: API_HOST + '/bindWxAccount',
  OPEN_UNBIND_WX: API_HOST + '/unbindWxAccount',
  OPEN_BIND_WX_CHECK: API_HOST + '/bindWxAccountCheck'
};

const OPTIONS_PACKAGE = [
  {
    label: '全部',
    value: -1000
  },
  {
    label: '主包',
    value: 101
  }
];

const PACKAGE_INFO = {
    101: '主包'
};

const OPTIONS_LOTTERY_TYPE = [
  {
    label: '全部',
    value: -1000
  },
  {
    label: '北京赛车',
    value: 10
  },
  {
    label: 'SG飞艇',
    value: 11
  },
  {
    label: '重庆时时彩',
    value: 20
  },
  {
    label: '足彩竞猜',
    value: 51
  }
];

const MATCH_TYPE_INFO = {
  '-1000': {
    name: '全部',
    gameTypes: [
      {
        label: '全部',
        value: -1000
      }
    ]
  },
  '10': {
    name: '北京赛车PK10',
    path: '/pk10match/list',
    gameTypes: [
      {
        label: '全部',
        value: -1000
      },
      {
        label: '冠亚和-大小',
        value: 100101
      },
      {
        label: '冠亚和-单双',
        value: 100102
      },
      {
        label: '冠亚和-得分',
        value: 104005
      },
      {
        label: '第1名-大小',
        value: 100201
      },
      {
        label: '第1名-单双',
        value: 100202
      },
      {
        label: '第1名-龙虎',
        value: 100203
      },
      {
        label: '第2名-大小',
        value: 100301
      },
      {
        label: '第2名-单双',
        value: 100302
      },
      {
        label: '第2名-龙虎',
        value: 100303
      },
      {
        label: '第3名-大小',
        value: 100401
      },
      {
        label: '第3名-单双',
        value: 100402
      },
      {
        label: '第3名-龙虎',
        value: 100403
      },
      {
        label: '第4名-大小',
        value: 100501
      },
      {
        label: '第4名-单双',
        value: 100502
      },
      {
        label: '第4名-龙虎',
        value: 100503
      },
      {
        label: '第5名-大小',
        value: 100601
      },
      {
        label: '第5名-单双',
        value: 100602
      },
      {
        label: '第5名-龙虎',
        value: 100603
      },
      {
        label: '第6名-大小',
        value: 100701
      },
      {
        label: '第6名-单双',
        value: 100702
      },
      {
        label: '第7名-大小',
        value: 100801
      },
      {
        label: '第7名-单双',
        value: 100802
      },
      {
        label: '第8名-大小',
        value: 100901
      },
      {
        label: '第8名-单双',
        value: 100902
      },
      {
        label: '第9名-大小',
        value: 101001
      },
      {
        label: '第9名-单双',
        value: 101002
      },
      {
        label: '第10名-大小',
        value: 101101
      },
      {
        label: '第10名-单双',
        value: 101102
      },
      {
        label: '第1名',
        value: 103004
      },
      {
        label: '第2名',
        value: 103104
      },
      {
        label: '第3名',
        value: 103204
      },
      {
        label: '第4名',
        value: 103304
      },
      {
        label: '第5名',
        value: 103404
      },
      {
        label: '第6名',
        value: 103504
      },
      {
        label: '第7名',
        value: 103604
      },
      {
        label: '第8名',
        value: 103704
      },
      {
        label: '第9名',
        value: 103804
      },
      {
        label: '第10名',
        value: 103904
      }
    ]
  },
  '11': {
    name: 'SG飞艇',
    path: '/sgftmatch/list',
    gameTypes: [
      {
        label: '全部',
        value: -1000
      },
      {
        label: '冠亚和-大小',
        value: 110101
      },
      {
        label: '冠亚和-单双',
        value: 110102
      },
      {
        label: '冠亚和-得分',
        value: 114005
      },
      {
        label: '第1名-大小',
        value: 110201
      },
      {
        label: '第1名-单双',
        value: 110202
      },
      {
        label: '第1名-龙虎',
        value: 110203
      },
      {
        label: '第2名-大小',
        value: 110301
      },
      {
        label: '第2名-单双',
        value: 110302
      },
      {
        label: '第2名-龙虎',
        value: 110303
      },
      {
        label: '第3名-大小',
        value: 110401
      },
      {
        label: '第3名-单双',
        value: 110402
      },
      {
        label: '第3名-龙虎',
        value: 110403
      },
      {
        label: '第4名-大小',
        value: 110501
      },
      {
        label: '第4名-单双',
        value: 110502
      },
      {
        label: '第4名-龙虎',
        value: 110503
      },
      {
        label: '第5名-大小',
        value: 110601
      },
      {
        label: '第5名-单双',
        value: 110602
      },
      {
        label: '第5名-龙虎',
        value: 110603
      },
      {
        label: '第6名-大小',
        value: 110701
      },
      {
        label: '第6名-单双',
        value: 110702
      },
      {
        label: '第7名-大小',
        value: 110801
      },
      {
        label: '第7名-单双',
        value: 110802
      },
      {
        label: '第8名-大小',
        value: 110901
      },
      {
        label: '第8名-单双',
        value: 110902
      },
      {
        label: '第9名-大小',
        value: 111001
      },
      {
        label: '第9名-单双',
        value: 111002
      },
      {
        label: '第10名-大小',
        value: 111101
      },
      {
        label: '第10名-单双',
        value: 111102
      },
      {
        label: '第1名',
        value: 113004
      },
      {
        label: '第2名',
        value: 113104
      },
      {
        label: '第3名',
        value: 113204
      },
      {
        label: '第4名',
        value: 113304
      },
      {
        label: '第5名',
        value: 113404
      },
      {
        label: '第6名',
        value: 113504
      },
      {
        label: '第7名',
        value: 113604
      },
      {
        label: '第8名',
        value: 113704
      },
      {
        label: '第9名',
        value: 113804
      },
      {
        label: '第10名',
        value: 113904
      }
    ]
  },
  '20': {
    name: '重庆时时彩',
    path: '/cqsscmatch/list',
    gameTypes: [
      {
        label: '全部',
        value: -1000
      }
    ]
  },
  '51': {
    name: '足彩竞猜',
    path: '/zqjcmatch/list',
    gameTypes: [
      {
        label: '全部',
        value: -1000
      }
    ]
  }
};

const PK10_GAMES = {
  100101: '冠亚和-大小',
  100102: '冠亚和-单双',

  100201: '第1名-大小',
  100202: '第1名-单双',
  100203: '第1名-龙虎',
  100301: '第2名-大小',
  100302: '第2名-单双',
  100303: '第2名-龙虎',
  100401: '第3名-大小',
  100402: '第3名-单双',
  100403: '第3名-龙虎',
  100501: '第4名-大小',
  100502: '第4名-单双',
  100503: '第4名-龙虎',
  100601: '第5名-大小',
  100602: '第5名-单双',
  100603: '第5名-龙虎',
  100701: '第6名-大小',
  100702: '第6名-单双',
  100801: '第7名-大小',
  100802: '第7名-单双',
  100901: '第8名-大小',
  100902: '第8名-单双',
  101001: '第9名-大小',
  101002: '第9名-单双',
  101101: '第10名-大小',
  101102: '第10名-单双',

  103004: '冠军',
  103104: '亚军',
  103204: '季军',
  103304: '第4名',
  103404: '第5名',
  103504: '第6名',
  103604: '第7名',
  103704: '第8名',
  103804: '第9名',
  103904: '第10名',

  104005: '冠亚和-得分'
};

const STRING_DEFINE = {
  ACCESS_USER: 'access-user',
  RESULT_SUCCESS: 'success',
  WX_CODE_URL: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx696768f4c88aa886&redirect_uri=http://admin.shengfyj.com/cp-admin/#{0}&response_type=code&scope=snsapi_base&state=1#wechat_redirect'
};

export default{
  ACTION_HOST,
  ACTION,
  STRING_DEFINE,
  OPTIONS_PACKAGE,
  OPTIONS_LOTTERY_TYPE,
  PK10_GAMES,
  PACKAGE_INFO,
  MATCH_TYPE_INFO
};
</script>
