import React, { Component } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTransaction from "./components/add-transaction.component";
import Transaction from "./components/transaction.component";
import TransactionsList from "./components/transaction-list.component";
import Dashboard from "./components/dashboard.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid d-flex justify-content-between">
            <div>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/add" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                      Add
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/transactions" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                      Transactions List
                    </NavLink>
                  </li>               
                </ul>
              </div>
            </div>
            <NavLink to="/dashboard" className="navbar-brand ms-auto">
              Personal Finance Tracker
            </NavLink>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsList />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/transaction/:id" element={<Transaction />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;