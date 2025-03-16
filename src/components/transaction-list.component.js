import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { Link } from "react-router-dom";
import "./transaction-list.css"; // Import the CSS file

export default class TransactionsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTransactions = this.retrieveTransactions.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTransaction = this.setActiveTransaction.bind(this);
    this.removeAllTransactions = this.removeAllTransactions.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.sortByCategory = this.sortByCategory.bind(this);

    this.state = {
      transactions: [],
      currentTransaction: null,
      currentIndex: -1,
      searchTitle: "",
      categories: [
        { id: 1, name: "Salary" },
        { id: 2, name: "Groceries" },
        { id: 3, name: "Entertainment" }
      ],
      sortOrder: "asc" // Default sort order
    };
  }

  componentDidMount() {
    this.retrieveTransactions();
  }

  retrieveTransactions() {
    TransactionDataService.getAll()
      .then(response => {
        this.setState({
          transactions: response.data
        }, this.sortByCategory); // Sort by category after retrieving transactions
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  refreshList() {
    this.retrieveTransactions();
    this.setState({
      currentTransaction: null,
      currentIndex: -1
    });
  }

  setActiveTransaction(transaction, index) {
    this.setState({
      currentTransaction: transaction,
      currentIndex: index
    });
  }

  removeAllTransactions() {
    TransactionDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTransaction: null,
      currentIndex: -1
    });

    TransactionDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          transactions: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getCategoryName(categoryId) {
    const category = this.state.categories.find(category => category.id === categoryId);
    return category ? category.name : "Unknown";
  }

  sortByCategory() {
    const { transactions, sortOrder } = this.state;
    const sortedTransactions = transactions.sort((a, b) => {
      const categoryA = this.getCategoryName(a.categoryId).toLowerCase();
      const categoryB = this.getCategoryName(b.categoryId).toLowerCase();
      if (sortOrder === "asc") {
        return categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
      } else {
        return categoryA > categoryB ? -1 : categoryA < categoryB ? 1 : 0;
      }
    });

    this.setState({
      transactions: sortedTransactions,
      sortOrder: sortOrder === "asc" ? "desc" : "asc"
    });
  }

  render() {
    const { searchTitle, transactions, currentTransaction, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by transaction name"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>   
        <div className="col-md-6">
          <h4>Transactions List</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th onClick={this.sortByCategory} style={{ cursor: "pointer" }}>
                  Category {this.state.sortOrder === "asc" ? "↑" : "↓"}
                </th>
                <th>Transaction Name</th>
                <th>Description</th>
                <th>Income</th>
                <th>Expense</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.map((transaction, index) => (
                <tr
                  className={index === currentIndex ? "active clickable" : "clickable"}
                  onClick={() => this.setActiveTransaction(transaction, index)}
                  key={index}
                >
                  <td>{this.getCategoryName(transaction.categoryId)}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.income}</td>
                  <td>{transaction.expense}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                  <td>{new Date(transaction.updatedAt).toLocaleString()}</td>
                  <td>
                    <Link to={"/transaction/" + transaction.id} className="btn btn-warning btn-sm">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTransactions}
          >
            Remove All
          </button>
        </div>       
      </div>
    );
  }
}