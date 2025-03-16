import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service";
import { withRouter } from '../common/with-router';

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeIncome = this.onChangeIncome.bind(this);
    this.onChangeExpense = this.onChangeExpense.bind(this);
    this.onChangeUpdatedAt = this.onChangeUpdatedAt.bind(this);
    this.getTransaction = this.getTransaction.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.retrieveCategories = this.retrieveCategories.bind(this);

    this.state = {
      currentTransaction: {
        id: null,
        title: "",
        description: "",
        categoryId: null,
        income: 0,
        expense: 0,
        updatedAt: ""        
      },
      categories: [],
      message: ""
    };
  }

  componentDidMount() {
    this.getTransaction(this.props.router.params.id);
    this.retrieveCategories();
  }

  retrieveCategories() {
    TransactionDataService.getCategories()
      .then(response => {
        this.setState({
          categories: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  getTransaction(id) {
    TransactionDataService.get(id)
      .then(response => {
        this.setState({
          currentTransaction: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        title: title
      }
    }));
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        description: description
      }
    }));
  }

  onChangeCategoryId(e) {
    const categoryId = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        categoryId: categoryId
      }
    }));
  }

  onChangeIncome(e) {
    const income = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        income: income
      }
    }));
  }

  onChangeExpense(e) {
    const expense = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        expense: expense
      }
    }));
  }

  onChangeUpdatedAt(e) {
    const updatedAt = e.target.value;
    this.setState(prevState => ({
      currentTransaction: {
        ...prevState.currentTransaction,
        updatedAt: updatedAt
      }
    }));
  }

  updateTransaction() {
    TransactionDataService.update(
      this.state.currentTransaction.id,
      this.state.currentTransaction
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Transaction was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTransaction() {    
    TransactionDataService.delete(this.state.currentTransaction.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/transactions');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTransaction, categories } = this.state;

    return (
      <div>
        {currentTransaction ? (
          <div className="edit-form">
            <h4>Transaction</h4>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      value={currentTransaction.title}
                      onChange={this.onChangeTitle}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={currentTransaction.description}
                      onChange={this.onChangeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoryId">Category</label>
                    <select
                      className="form-control"
                      id="categoryId"
                      value={currentTransaction.categoryId}
                      onChange={this.onChangeCategoryId}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="income">Income</label>
                    <input
                      type="number"
                      className="form-control"
                      id="income"
                      value={currentTransaction.income}
                      onChange={this.onChangeIncome}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expense">Expense</label>
                    <input
                      type="number"
                      className="form-control"
                      id="expense"
                      value={currentTransaction.expense}
                      onChange={this.onChangeExpense}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expense">Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      id="expense"
                      value={currentTransaction.income - currentTransaction.expense}                    
                    />
                  </div>   
                </div>
              </div>              
            </form>        
            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTransaction}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTransaction}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Transaction...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Transaction);