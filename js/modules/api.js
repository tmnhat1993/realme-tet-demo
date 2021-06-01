export default class API {
  /* ===================================
   *  CONSTRUCTOR
   * =================================== */
  constructor(config) {
    this.config = config
    this.url = 'https://vaichuoi.com' + config.url;
    this.method = config.method || 'GET';
    this.data = config.data;
    this.success = config.success;
    this.err = config.err;
    this.callAjax()
  }

  callAjax() {
    $.ajax({
      url: this.url,
      method: this.method,
      data: this.data,
      headers: {
        'Authorization': localStorage.getItem('token'),
      },
    }).done((res) => {
      const data = res.data || {}
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Run callback
      if ($.isFunction(this.success)) {
        this.success(res)
      }
    }).fail((err, textStatus, errorThrown) => {
      this.err(err, textStatus, errorThrown);
    });
  }
}
