class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );

    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);
    return token;
  }

  async createOrder(orderPayLoad) {
    const orderResponse = await apiContext.post(
      "https://www.rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayLoad,
        headers: {
          Authorization: this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    return orderId;
  }
}
module.exports = { APIUtils };
