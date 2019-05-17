<script>
  import axios from 'axios';
  import Vue from 'vue';
  import Qs from 'qs';

  let mAxiosLoading;
  axios.interceptors.request.use(
    (config) => {
      // 所有请求之前都要执行的操作
      // 根据接口传入参数显示加载动画
      mAxiosLoading = Vue.prototype.openLoading();

      return config;
    }, function (err) {
      return Promise.reject(err);
    }
  );
  // http response 拦截器
  axios.interceptors.response.use((response) => {
    // 所有请求完成后都要执行的操作
    // 暂停加载动画
    if (mAxiosLoading) {
        mAxiosLoading.close();
    }
    return response;
  }, function (err) {
    if (err.response) {
      switch (err.response.status) {
      }
    }
    return Promise.reject(err);
  });

  // 深复制
  function deepClone (data) {
    let type;
    if (data === null) {
      type = 'Null';
    } else if (data === undefined) {
      type = 'Undefined';
    } else {
      type = Object.prototype.toString.call(data).slice(8, -1);
    }

    let obj;
    if (type === 'array') {
      obj = [];
    } else if (type === 'object') {
      obj = {};
    } else {
      // 不再具有下一层次
      return data;
    }
    if (type === 'array') {
      for (let i = 0, len = data.length; i < len; i++) {
        obj.push(deepClone(data[i]));
      }
    } else if (type === 'object') {
      for (let key in data) {
        obj[key] = deepClone(data[key]);
      }
    }
    return obj;
  }

  // 日期格式化
  function dateFormat (date, fmt) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
    return fmt;
  }

  // 从服务端获取数据导出excel表
  function exportExcel (url, params, filename) {
    axios({
      method: 'post',
      url: url,
      data: Qs.stringify(params),
      responseType: 'blob'
    })
      .then(res => {
        let fileName = filename + '.csv';
        let type = res.headers['content-type'];
        let blob = new Blob([res.data], {type: type});
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, fileName);
        }
        let elink = document.createElement('a');
        elink.download = fileName;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      });
  }

  // 获取url中的参数
  function getUrlParam (parameName) {
    /// 获取地址栏指定参数的值
    /// <param name="parameName">参数名</param>
    // 获取url中跟在问号后面的部分
    let parames = window.location.search;
    // 检测参数是否存在
    if (parames.indexOf(parameName) > -1) {
      let parameValue = '';
      parameValue = parames.substring(parames.indexOf(parameName), parames.length);
      // 检测后面是否还有参数
      if (parameValue.indexOf('&') > -1) {
        // 去除后面多余的参数, 得到最终 parameName=parameValue 形式的值
        parameValue = parameValue.substring(0, parameValue.indexOf('&'));
        // 去掉参数名, 得到最终纯值字符串
        parameValue = parameValue.replace(parameName + '=', '');
        return parameValue;
      }
      return '';
    }
  }

  // 格式化数字字符串为部分隐藏
  function formatNumCode (code) {
    if (!code) {
        return '';
    }

    if (code.length < 4) {
        return code;
    }

    if (code.length < 7) {
        return '***' + code.slice(-4);
    }

    return code.slice(0, 3) + '****' + code.slice(-4);
  }

  export default {
    deepClone,
    dateFormat,
    exportExcel,
    getUrlParam,
    formatNumCode
  };
</script>
