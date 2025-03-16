import React, { Component } from "react";
import TransactionDataService from "../services/transaction.service"; 

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
    this.onChangeIncome = this.onChangeIncome.bind(this);
    this.onChangeExpense = this.onChangeExpense.bind(this);
    this.onChangeCreatedAt = this.onChangeCreatedAt.bind(this);
    this.onChangeUpdatedAt = this.onChangeUpdatedAt.bind(this);
    this.saveTransaction = this.saveTransaction.bind(this);
    this.newTransaction = this.newTransaction.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      categoryId: null,
      income: 0,
      expense: 0,
      createdAt: "",
      updatedAt: "",
      published: false,
      submitted: false,
      categories: []
    };
  }

  componentDidMount() {
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
  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCategoryId(e) {
    this.setState({
      categoryId: e.target.value
    });
  }

  onChangeIncome(e) {
    this.setState({
      income: e.target.value
    });
  }

  onChangeExpense(e) {
    this.setState({
      expense: e.target.value
    });
  }

  onChangeCreatedAt(e) {
    this.setState({
      createdAt: e.target.value
    });
  }

  onChangeUpdatedAt(e) {
    this.setState({
      updatedAt: e.target.value
    });
  }

  saveTransaction() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      categoryId: this.state.categoryId,
      income: this.state.income,
      expense: this.state.expense,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt
    };

    TransactionDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          categoryId: response.data.categoryId,
          income: response.data.income,
          expense: response.data.expense,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTransaction() {
    this.setState({
      id: null,
      title: "",
      description: "",
      categoryId: null,
      income: 0,
      expense: 0,
      createdAt: "",
      updatedAt: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTransaction}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    name="title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    required
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="categoryId">Category</label>
                  <select
                    className="form-control"
                    id="categoryId"
                    required
                    value={this.state.categoryId}
                    onChange={this.onChangeCategoryId}
                    name="categoryId"
                  >
                    <option value="">Select</option>
                    {this.state.categories.map(category => (
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
                    required
                    value={this.state.income}
                    onChange={this.onChangeIncome}
                    name="income"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expense">Expense</label>
                  <input
                    type="number"
                    className="form-control"
                    id="expense"
                    required
                    value={this.state.expense}
                    onChange={this.onChangeExpense}
                    name="expense"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="createdAt">Created At</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="createdAt"
                    required
                    value={this.state.createdAt}
                    onChange={this.onChangeCreatedAt}
                    name="createdAt"
                  />
                </div>             
              </div>
            </div>

            <button onClick={this.saveTransaction} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}