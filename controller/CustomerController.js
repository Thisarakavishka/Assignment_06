import {CustomerModel} from "/model/CustomerModel.js";
import {customer_db} from "/db/db.js";

$("#customer-tbl-body").on("click", "tr", function () {
    var index = $(this).index();
    const table = document.querySelector("#customer-tbl-body");
    const tableCells = table.children[index].children;

    var customerModel = new CustomerModel(
        tableCells[0].textContent,
        tableCells[1].textContent,
        tableCells[2].textContent,
        tableCells[3].textContent,
    );

    $("#customerId").val(customerModel.customer_id);
    $("#firstName").val(customerModel.first_name);
    $("#lastName").val(customerModel.last_name);
    $("#address").val(customerModel.address);
});

$("#customer_submit").on("click", (event) => {
    event.preventDefault();
    var customer = new CustomerModel(
        $("#customerId").val(),
        $("#firstName").val(),
        $("#lastName").val(),
        $("#address").val()
    );

    customer_db.push(customer);
    loadData();
});

$("#customer_delete").on("click", (event) => {
    let customer_id = $("#customerId").val();
    let index = customer_db.findIndex(item => item.customer_id === customer_id);

    customer_db.splice(index,1);
    loadData();
});

$("#customer_update").on("click", (event) => {
    let customerUpdate = new CustomerModel(
        $("#customerId").val(),
        $("#firstName").val(),
        $("#lastName").val(),
        $("#address").val()
    );
    let index = customer_db.findIndex(item => item.customer_id === customerUpdate.customer_id);
    customer_db[index] = customerUpdate;
    loadData();
});

const loadData = () => {
    $("#customer-tbl-body").empty();
    customer_db.map((item, index) => {
        let record = `<tr><td>${item.customer_id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.address}</td></tr>`;
        $("#customer-tbl-body").append(record);
    });
    $("button[type='reset']").click();
};
