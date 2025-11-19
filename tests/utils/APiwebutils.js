class Apiwebutils {
  constructor(context, logintoken) {
    this.context = context;
    this.logintoken = logintoken;
  }

  async gettoken() {
    const loginstatus = await context.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.logintoken,
      }
    );
    expect(loginstatus.ok()).toBeTruthy();
    const resposeJson = await loginstatus.json();
    token = await resposeJson.token;
    return token;
  }
  async creatorder(resposeoder) {
    let orderId = {};
    orderId.token = await this.gettoken();
    const responseoder = await request.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: resposeoder,
        headers: {
          Authorization: orderId.token,
          "content-type": "application/json",
        },
      }
    );
    const resposnejson = await responseoder.json();
    orderIndex = resposnejson.orders[0];
    orderId.orderIndex = orderIndex;
    return orderId;
  }
}

module.exports = { Apiwebutils };
