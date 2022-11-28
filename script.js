window.onload = () =>{
    const list = document.getElementById("url-label")
    const got = localStorage.getItem("links")
    const arranged = got?.split(";;;").map(x => x).join("\n")
    list.innerHTML = arranged
    const button = document.querySelector("#shorten");
    const input = document.querySelector("#input-field");
    const longUrl = document.querySelector("#input-url");
    const shortUrl = document.querySelector("#new-url");
    const resultDiv = document.querySelector("#output-div")
    const errorDiv = document.querySelector("#error-div");
    const errorMessage = document.querySelector("#error-text");
    const clearButton = document.querySelector("#clear-btn");
    const copyButton = document.getElementById("copy-btn");
    
    /* button action */
    button.addEventListener("click", (event) => {
      event.preventDefault();
      if(input.value) {
        shorten(input.value);
      } else {
        showError();
        hideResult();
      }
    })
    
    /* function to handle errors */
    const handleError = (response) => {
      console.log(response);
      if(!response.ok) {
        errorMessage.textContent = "Please enter a valid URL."
        showError();
        hideResult();
      } else {
      hideError();
      return response;
      }
    }
    
    /* function to get shortened url with input "url" with fetch and deal with error */
    const shorten = (input) => {
      fetch("/create?url=" + input, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(handleError)
      .then(response => response.json())
      .then((json) => {
        let links = localStorage.getItem("links")
        if(!links) links = ""
        localStorage.setItem("links", links + `${json.link};;;`)
        shortUrl.innerHTML = json.link;
        showResult();
      })
      .catch(error => {
        console.log(error);
      })
    }
    
    copyButton.onclick = () =>{
        navigator.clipboard.writeText(shortUrl.innerHTML);
    }
    
    /* Clipboard functions */
    
    /* Clear fields */
    const clearFields = () => {
      input.value = '';
      hideResult();
      hideError();
    }
    
    clearButton.addEventListener("click", (event) => {
      event.preventDefault();
      clearFields();
    })
    
    
    /* display/hide results and errors */
    const showResult = () => {
      shortUrl.style.display = "flex";
    }
    
    const hideResult = () => {
      shortUrl.style.display = "none";
    }
    
    const showError = () => {
      errorDiv.style.display = "block";
    }
    
    const hideError = () => {
      errorDiv.style.display = "none";
    }
    
            }
