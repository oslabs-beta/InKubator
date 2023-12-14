import React, { useState } from "react";

const AuthTest = () => {
    const [formValue, setFormValue] = useState();

    const fetchRequest = async (endpoint, method, card) => {
        // If no "method" is passed, it uses this default header
        let defaultHeader = {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(card)
          };
        // If a method is is passed, it updates the default header
        let header = Object.assign({}, defaultHeader, method);
    
        const result = await fetch(`${endpoint}`, header)
          .then((data) => data.json())
          // .then((data) => console.log('DATA', data))
          .catch((err) => console.error(err))
        return result;
      }

    const formValueHandleChange = (e) => {
        console.log(e.target.value)
        setFormValue(e.target.value)
    }

    const formHandleSubmit = async (e) => {
        await e.preventDefault()
        const outputAnything = await fetchRequest('http://localhost:3001/google/inputAnything', {method: "POST", no}, formValue)
        await console.log(outputAnything)
    }

    return (
        <div>

        <form onSubmit={formHandleSubmit}>
            <input type="text" onChange={formValueHandleChange}></input>
            <button type="submit"> Submit </button>
        </form>

        Form Value
        <div>
        {formValue}
        </div>
        </div>
    )
}

export default AuthTest;