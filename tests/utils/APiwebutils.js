class Apiwebutils {
  constructor(context, logindata) {
    this.context = context;
    this.logindata = logindata;
  }

  async gettoken() {
    const loginstatus = await this.context.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.logindata,
      }
    );
    const resposeJson = await loginstatus.json();
    const token = await resposeJson.token;
    return token;
  }
  async creatorder(oderPayload) {
    let orderId = {};
    orderId.token = await this.gettoken();
    const responseoder = await this.context.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: oderPayload,
        headers: {
          Authorization: orderId.token,
          "content-type": "application/json",
        },
      }
    );
    const resposnejson = await responseoder.json();
    const orderIndex = resposnejson.orders[0];
    orderId.orderIndex = orderIndex;
    return orderId;
  }
}

module.exports = { Apiwebutils };
