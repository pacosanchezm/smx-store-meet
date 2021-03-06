import React, { useState, useEffect, useContext, createContext, Suspense } from "react"

// ---------- styles
/** @jsxRuntime classic */

 // /** @jsx jsx */ 
  import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui"
  import { Grid, Flex, Box, Button, Text, Image, Spinner, Input } from "@theme-ui/components"
  //import "@babel/polyfill"


  import Container from 'react-bootstrap/Container'
  import Row from 'react-bootstrap/Row'
  import 'bootstrap/dist/css/bootstrap.min.css';






  // ------------------
  //import usedata from "./usedata"
  import Share from "./share"

let App;
const StateContext = createContext();

// -------------------------------------------

const useStateUniv = (props) => {
  return {
    Loading: {
      DataMain: useState(useContext(createContext(false))),
      Registros: useState(useContext(createContext(false))),
    },


  };
}

// ------------------

const ContextProvider = ( props ) => {
  return (
    <StateContext.Provider value={useStateUniv()}>
      <ThemeProvider theme={props.Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
}

// --------------------------------------------------------------------------

let useStatusLocal = function(StateContextM) {
  return {
    main: function() { return 1 },
  }
}

// --------------------------------------------------------------------------

let useAccionesLocal = function(StateContext) {
 // const useDataLocal = new usedata()
  const [LoadingDataMain, setLoadingDataMain] = useContext(StateContext).Loading.DataMain

  // ---------------------
  
  return {
    Loader : async function (props) {

      const [Registro, setRegistro] = props.useContext.Registro

      setLoadingDataMain(true)

      // let useDataRes = await useDataLocal.Page().get({ClaveWp:props.clave})
      // setRegistro(useDataRes)

      setLoadingDataMain(false)
    },
  }
}

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------

const Body = props => {

  const useaccioneslocal = new useAccionesLocal(StateContext)
  const usestatuslocal = new useStatusLocal(StateContext)

  // ------------
    useEffect(() => {
      useaccioneslocal.Loader(props)
    }, [])


    // ------------

  try {

    return (

        <Share {...props}
          useContextLocal={useContext(StateContext)}
          useAccionesLocal = {useaccioneslocal}
          useStatusLocal = {usestatuslocal}
        /> 

    )

  } catch (e) { console.error(e)}
}

// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {


  return (
    <ContextProvider Theme={props.Theme}>
      <main >
        <Body {...props} />
      </main>
    </ContextProvider>
  );
});

// ----------------------------------------------------------------------------
