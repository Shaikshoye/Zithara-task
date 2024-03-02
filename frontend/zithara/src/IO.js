export const get = async () => {
    let server_url = "http://localhost:8080/users";  
    return await fetch(server_url, {
      method: 'GET',
    }).then((res) => {
      try {
        if (res.status === 200) {
          return res.json();
        } else {
          return { error: "data not found" };
        }
      } catch (e) {
        console.log("catch:", e);
      }
    });
  };
  