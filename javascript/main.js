// ================= LOGIN / REGISTER POPUP ====================
function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
}

function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}

function openRegisterPopup() {
    document.getElementById("registerPopup").style.display = "block";
    closeLoginPopup();
}

function closeRegisterPopup() {
    document.getElementById("registerPopup").style.display = "none";
}

// ================= FORM VALIDATION ====================
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    let registerForm = document.getElementById("register-form");
    if (registerForm) {
        console.log("Register form detected!");
        registerForm.addEventListener("submit", function (event) {
            const firstName = registerForm.querySelector('input[name="first_name"]').value.trim();
            const lastName = registerForm.querySelector('input[name="last_name"]').value.trim();
            const contact = registerForm.querySelector('input[name="contact"]').value.trim();
            const email = registerForm.querySelector('input[name="email"]').value.trim();
            const role = registerForm.querySelector('select[name="role"]').value.trim();

            if (!firstName || !lastName || !contact || !email || !role) {
                alert("All required fields must be filled out!");
                event.preventDefault();
            } else {
                alert("Registration submitted! You’ll receive your login credentials via email.");
                setTimeout(function() {
                    window.location.href = "../landing/index.php";
                }, 1000);
            }
        });
    } else {
        console.warn("Register form not found! Check your form ID in Register.php.");
    }

    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        console.log("Login form detected!");
        loginForm.addEventListener("submit", function (event) {
            const email = loginForm.querySelector('input[name="email"]').value.trim();
            const password = loginForm.querySelector('input[name="password"]').value.trim();
            if (!email || !password) {
                alert("Both email and password are required!");
                event.preventDefault();
            }
        });
    } else {
        console.warn("Login form not found! Check your form ID in Login.php.");
    }
});

// ================= PRINT MODAL AND COLUMN SELECTION ====================
function openPrintModal(tableId) {
    document.getElementById('printModal').style.display = 'block';
    document.getElementById('printModalOverlay').style.display = 'block';

    let columnChoices = document.getElementById('columnChoices');
    columnChoices.innerHTML = '';

    populateColumnChoices(tableId);
}

function closePrintModal() {
    document.getElementById('printModal').style.display = 'none';
    document.getElementById('printModalOverlay').style.display = 'none';
}

function populateColumnChoices(tableId) {
    let columnChoices = document.getElementById('columnChoices');
    let table = document.getElementById(tableId);
    let headerCells = table.querySelector('thead tr').querySelectorAll('th');

    headerCells.forEach((th, index) => {
        let label = document.createElement('label');
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'column-checkbox';
        checkbox.setAttribute('data-index', index + 1);
        checkbox.checked = true;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + th.textContent));
        columnChoices.appendChild(label);
        columnChoices.appendChild(document.createElement('br'));
    });
}

// ================= NEW PROFESSIONAL PRINT FUNCTION ====================
function printTable() {
    let tableId = document.querySelector('.print-container table').id; // auto-detects table
    let table = document.getElementById(tableId);
    let tableClone = table.cloneNode(true);

    // Hide unchecked columns
    let checkboxes = document.querySelectorAll('.column-checkbox');
    checkboxes.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            let colIndex = index;
            Array.from(tableClone.rows).forEach(row => {
                if (row.cells[colIndex]) {
                    row.cells[colIndex].style.display = 'none';
                }
            });
        }
    });

    // Create clean printable window
    let printWindow = window.open('', '', 'width=1200,height=800');
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Table</title>
            <style>
                body { font-family: "Times New Roman", serif; font-size: 12pt; margin: 20px; }
                h2, h3, p { text-align: center; margin: 4px 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th, td { border: 1px solid black; padding: 5px; text-align: left; font-size: 11pt; }
                thead { display: table-header-group; }
                tfoot { display: table-footer-group; }
                tr { page-break-inside: avoid; }
            </style>
        </head>
        <body>
            <h2>President Ramon Magsaysay State University</h2>
            <h3>Research University Office</h3>
            <p>Date Printed: ${new Date().toLocaleDateString()}</p>
            ${tableClone.outerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();

    closePrintModal();
}

// ================= UTILITIES ====================
function logout() {
    if (confirm("Are you sure you want to log out?")) {
        window.location.href = "logout.php";
    }
}

function downloadFile(link) {
    if (link && link !== "NULL") {
        window.open(link, "_blank");
    } else {
        alert("No file available for download.");
    }
}
