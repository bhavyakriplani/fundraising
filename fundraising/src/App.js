const loginPage = document.getElementById("login-page");
const dashboardPage = document.getElementById("dashboard");
const campaignDetailsPage = document.getElementById("campaign-details");
const campaignCards = document.getElementById("campaign-cards");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const createCampaignBtn = document.getElementById("create-campaign-btn");
const campaignInfo = document.getElementById("campaign-info");
const backBtn = document.getElementById("back-btn");
const donateNowBtn = document.getElementById("donate-now-btn");
const donationForm = document.getElementById("donation-form");

let currentUser = null;
let selectedCampaign = null;

// Sample campaign data (you'll fetch this data from the backend)
const campaigns = [
  {
    id: 1,
    name: "Campaign 1",
    aadhar: "1234 5678 9012",
    phone: "9876543210",
    goal: 1000,
    currentAmount: 500,
    imageUrl: "path_to_image_1.jpg",
  },
  {
    id: 2,
    name: "Campaign 2",
    aadhar: "0987 6543 2109",
    phone: "1234567890",
    goal: 2000,
    currentAmount: 750,
    imageUrl: "path_to_image_2.jpg",
  },
  // Add more campaigns here...
];

function showLoginPage() {
  loginPage.style.display = "block";
  dashboardPage.style.display = "none";
  campaignDetailsPage.style.display = "none";
  donationForm.style.display = "none";
}

function showDashboard() {
  loginPage.style.display = "none";
  dashboardPage.style.display = "block";
  campaignDetailsPage.style.display = "none";
  donationForm.style.display = "none";
  renderCampaignCards();
}

function showCampaignDetails(campaign) {
  loginPage.style.display = "none";
  dashboardPage.style.display = "none";
  campaignDetailsPage.style.display = "block";
  donationForm.style.display = "none";

  campaignInfo.innerHTML = `
    <div class="card">
      <img src="${campaign.imageUrl}" alt="Campaign Image">
      <h3>${campaign.name}</h3>
      <p>Aadhar: ${campaign.aadhar}</p>
      <p>Phone: ${campaign.phone}</p>
      <p>Goal: $${campaign.goal}</p>
      <p>Current Amount: $${campaign.currentAmount}</p>
    </div>
  `;

  selectedCampaign = campaign;
}

function showDonationForm() {
  donationForm.style.display = "block";
}

function hideDonationForm() {
  donationForm.style.display = "none";
}

function createCampaignCard(campaign) {
  const card = document.createElement("div");
  card.classList.add("card");
  const image = document.createElement("img");
  image.src = campaign.imageUrl;
  image.alt = "Campaign Image";
  card.appendChild(image);
  const name = document.createElement("h3");
  name.textContent = campaign.name;
  card.appendChild(name);
  const donateBtn = document.createElement("button");
  donateBtn.textContent = "Donate Now";
  donateBtn.addEventListener("click", () => {
    showCampaignDetails(campaign);
    showDonationForm();
  });
  card.appendChild(donateBtn);
  campaignCards.appendChild(card);
}

function renderCampaignCards() {
  campaignCards.innerHTML = "";
  campaigns.forEach((campaign) => {
    createCampaignCard(campaign);
  });
}

function handleLoginFormSubmit(event) {
  event.preventDefault();
  const username = event.target.elements.username.value;
  const password = event.target.elements.password.value;
  // Implement actual login logic here (e.g., call backend API for authentication)
  // For simplicity, we'll just consider any non-empty username as a successful login.
  if (username.trim() !== "") {
    currentUser = username;
    showDashboard();
  } else {
    alert("Invalid username. Please try again.");
  }
}

function handleLogout() {
  currentUser = null;
  showLoginPage();
}

function handleDonation(event) {
  event.preventDefault();
  const donationAmount = parseFloat(event.target.elements["donation-amount"].value);
  if (donationAmount <= 0 || isNaN(donationAmount)) {
    alert("Please enter a valid donation amount.");
    return;
  }

  // Update the campaign's currentAmount on the frontend (you'll send this data to the backend later)
  selectedCampaign.currentAmount += donationAmount;

  // Hide the donation form and go back to campaign details
  hideDonationForm();
  showCampaignDetails(selectedCampaign);
}

// Event listeners
loginForm.addEventListener("submit", handleLoginFormSubmit);
logoutBtn.addEventListener("click", handleLogout);
backBtn.addEventListener("click", showDashboard);
donateNowBtn.addEventListener("click", showDonationForm);
donationForm.addEventListener("submit", handleDonation);

// Show the login page initially
showLoginPage();
