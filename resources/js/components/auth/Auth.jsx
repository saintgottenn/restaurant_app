import React, { useState } from "react";
import Register from "../auth/Register";
import Login from "../auth/Login";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  const openTab = (tabName) => {
    setActiveTab(tabName);
    setIsPanelVisible(true);
  };

  return (
    <div>
      <div
        id="background"
        className={isPanelVisible ? "active" : ""}
        onClick={() => setIsPanelVisible(false)}
      ></div>
      <div className="container auth-container">
        <div className="image-container"></div>
        <div className="welcome">Добро пожаловать</div>
        <div className="info-text">
          Перед тем как использовать SwipeMenu, пожалуйста, сначала
          зарегистрируйтесь
        </div>
        <button className="btn" onClick={() => openTab("signup")}>
          Создать аккаунт
        </button>
        <button className="btn btn-ghost" onClick={() => openTab("login")}>
          Войти
        </button>
        <div className="footer">
          Вход в систему или регистрация, вы соглашаетесь с
          <a href="http://">
            условиями использования и политикой конфиденциальности.
          </a>
        </div>

        <div
          className={`panel ${isPanelVisible ? "active" : ""}`}
          id="registrationPanel"
        >
          <div className="tabs">
            <div className="close-tab"></div>
            <button
              className={`tab tab-link ${
                activeTab === "signup" ? "active" : ""
              }`}
              onClick={() => openTab("signup")}
            >
              Создать аккаунт
            </button>
            <button
              className={`tab tab-link ${
                activeTab === "login" ? "active" : ""
              }`}
              id="loginBtn"
              onClick={() => openTab("login")}
            >
              Войти
            </button>
          </div>

          {activeTab === "signup" ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
