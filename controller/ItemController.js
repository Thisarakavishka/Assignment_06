import {ItemModel} from "/model/ItemModel.js";
import {item_db} from "/db/db.js";

$("#item-tbl-body").on("click", "tr", function () {
    var index = $(this).index();
    const table = document.querySelector("#item-tbl-body");
    const tableCells = table.children[index].children;

    var itemModel = new ItemModel(
        tableCells[0].textContent,
        tableCells[1].textContent,
        tableCells[2].textContent,
        tableCells[3].textContent,
    );

    $("#itemId").val(itemModel.item_id);
    $("#description").val(itemModel.description);
    $("#unitPrice").val(itemModel.unit_price);
    $("#stock").val(itemModel.stock);
});

$("#item_submit").on("click", (event) => {
    event.preventDefault();
    var item = new ItemModel(
        $("#itemId").val(),
        $("#description").val(),
        $("#unitPrice").val(),
        $("#stock").val()
    );

    item_db.push(item);
    loadData();
});

$("#item_delete").on("click", (event) => {
    let item_id = $("#itemId").val();
    let index = item_db.findIndex(item => item.item_id === item_id);

    item_db.splice(index,1);
    loadData();
});

$("#item_update").on("click", (event) => {
    let itemUpdate = new ItemModel(
        $("#itemId").val(),
        $("#description").val(),
        $("#unitPrice").val(),
        $("#stock").val()
    );
    let index = item_db.findIndex(item => item.item_id === itemUpdate.item_id);
    item_db[index] = itemUpdate;
    loadData();
});

const loadData = () => {
    $("#item-tbl-body").empty();
    item_db.map((item, index) => {
        let record = `<tr><td>${item.item_id}</td><td>${item.description}</td><td>${item.unit_price}</td><td>${item.stock}</td></tr>`;
        $("#item-tbl-body").append(record);
    });
    $("button[type='reset']").click();
};
