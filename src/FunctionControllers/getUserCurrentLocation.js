const getLocation = () => {
  if (navigator.geolocation) {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords.latitude);
        });
      } else if (result.state === "denied") {
            alert("Enable location permissions for this website on your browser setting");
      }
    });
  }else{
    alert("Geolocation is not supported in your browser");
  }
};

export { getLocation };
