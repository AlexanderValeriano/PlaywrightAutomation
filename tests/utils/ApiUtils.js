class APIUtils{
    async getToken()
    {
        const loginResponse = await apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
              data: loginPayload,
            }
          );
          // response code 200,201,2.02
          expect(loginResponse.ok()).toBeTruthy();
          const loginResponseJson = await loginResponse.json();
          token = loginResponseJson.token;
          console.log(token);
          return token;
    }
}