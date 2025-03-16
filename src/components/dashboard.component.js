import React, { Component } from "react";
import { PieChart } from "react-minimal-pie-chart";
import TransactionDataService from "../services/transaction.service";
import "./dashboard.css"; // Import the CSS file

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleChartClick = this.handleChartClick.bind(this);

    this.state = {
      transactionDataList: [],
      clickedSegment: null,
      transactions: [],
      income: 0,
      expenses: 0,
      balance: 0
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
        }, this.processTransactionData);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  processTransactionData() {
    const { transactions } = this.state;

    const income = transactions.reduce((sum, transaction) => sum + transaction.income, 0);
    const expenses = transactions.reduce((sum, transaction) => sum + transaction.expense, 0);
    const balance = income - expenses;

    const categoryCounts = [
      { id: 1, name: "Total Income", color: "green", value: income },
      { id: 2, name: "Total Expense", color: "red", value: expenses },
      { id: 3, name: "Balance", color: "blue", value: balance }
    ];

    const totalTransactions = income + expenses;
    const transactionDataList = categoryCounts.map(category => ({
      title: category.name,
      value: (category.value / totalTransactions) * 100,
      color: category.color
    }));

    this.setState({ transactionDataList, income, expenses, balance });
  }

  handleChartClick(event, dataIndex) {
    if (dataIndex !== undefined) {
      const { transactionDataList } = this.state;
      this.setState({
        clickedSegment: transactionDataList[dataIndex]
      });
    }
  }

  render() {
    const { transactionDataList, clickedSegment, income, expenses, balance } = this.state;

    return (
      <div>
        <div className="pie-chart-container">
          <PieChart
            data={transactionDataList}
            style={{ height: '300px' }}
            animate
            onClick={(event, dataIndex) => this.handleChartClick(event, dataIndex)}
          />
        </div>
        <div>
          {transactionDataList.map((data, index) => (
            <div key={index} style={{ margin: '10px 0' }}>
              <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: data.color, marginRight: '10px' }}></span>
              <span>{data.title}: {data.value.toFixed(2)}% (BDT {data.title === "Total Income" ? income.toFixed(2) : data.title === "Total Expense" ? expenses.toFixed(2) : balance.toFixed(2)})</span>
            </div>
          ))}
        </div>
        {clickedSegment && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <h3>In Details</h3>
            <p>
              Color: <span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: clickedSegment.color }}></span>
            </p>
            <p>              
              {clickedSegment.title}: BDT {clickedSegment.title === "Total Income" ? income.toFixed(2) : clickedSegment.title === "Total Expense" ? expenses.toFixed(2) : balance.toFixed(2)}
            </p>
            <p>
              Percentage: {clickedSegment.value.toFixed(2)}%
            </p>
           
          </div>
        )}
      </div>
    );
  }
}