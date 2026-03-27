let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
  let list = document.getElementById("list");
  let balance = document.getElementById("balance");

  list.innerHTML = "";

  let total = 0;

  transactions.forEach((t, index) => {
    total += t.type === "income" ? t.amount : -t.amount;

    let li = document.createElement("li");
    li.classList.add(t.type);

    li.innerHTML = `
      ${t.text} - ₹${t.amount}
      <button onclick="deleteTransaction(${index})">❌</button>
    `;

    list.appendChild(li);
  });

  balance.innerText = total;
}

function addTransaction() {
  let text = document.getElementById("text").value;
  let amount = document.getElementById("amount").value;
  let type = document.getElementById("type").value;

  if (!text || !amount) return;

  transactions.push({
    text: text,
    amount: Number(amount),
    type: type
  });

  saveData();
  updateUI();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveData();
  updateUI();
}

updateUI();