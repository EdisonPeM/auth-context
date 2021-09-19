# Auth context

Implementación de un sistema de usuarios simple y rutas protegidas en React, ver online [aqui](https://csb-pexgk.vercel.app/).

- Creación del contexto usando **React.createContext**.
- Estado global manipulado por reducers y actions, usando **React.useReducer**
- Acceso al estado global usando el hook **React.useContext** en los componentes.
- Validación del autenticación de usuario para redirigir rutas protegidas a la página de _login_.
  - Una vez logeado el usuario se retorna a la ruta protegida que deseaba acceder.
- Estrategia de **refreshToken** para validar la sesión activa del usuario (_simulando una cookie segura con localStorage_)
- Almacenamiento del **accessToken** en una variable del estado global (_en memoria_) evitando el uso de localStorage.
- Implementación de un **Custom Hook** para peticiones de recursos protegidos usando el accessToken en el header de authenticación.
- Validación del tiempo de expiración (_1m_) del token de autenticación decodificandolo con **jsonwebtoken** para solicitar nuevo token.
- Simulación de la expiración del **refreshToken** (_5min_) cerrando la sesión del usuario loggeado.
- Placeholder de carga mientas se obtienen los tokens.
- **División de código** basado en rutas reutilizando la pantalla de carga.
