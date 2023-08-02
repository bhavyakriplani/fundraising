const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect('mongodb+srv://bhavyakriplanics21:life12345@cluster0.ejcmnh9.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Create a campaign schema
const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  aadhar: { type: String, required: true },
  phone: { type: String, required: true },
  goal: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  imageUrl: { type: String, required: true },
});

// Create a model based on the schema
const Campaign = mongoose.model('Campaign', campaignSchema);

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// Endpoint to create a new campaign
app.post('/api/campaigns', (req, res) => {
  const { name, aadhar, phone, goal, currentAmount, imageUrl } = req.body;

  const newCampaign = new Campaign({
    name,
    aadhar,
    phone,
    goal,
    currentAmount,
    imageUrl,
  });

  newCampaign.save((err, campaign) => {
    if (err) {
      console.error('Error saving campaign:', err);
      return res.status(500).json({ error: 'Error creating campaign' });
    }

    res.status(201).json(campaign);
  });
});

// Endpoint to get all campaigns
app.get('/api/campaigns', (req, res) => {
  Campaign.find({}, (err, campaigns) => {
    if (err) {
      console.error('Error retrieving campaigns:', err);
      return res.status(500).json({ error: 'Error retrieving campaigns' });
    }

    res.status(200).json(campaigns);
  });
});

// Endpoint to update a campaign's currentAmount
app.put('/api/campaigns/:id', (req, res) => {
  const campaignId = req.params.id;
  const { currentAmount } = req.body;

  Campaign.findByIdAndUpdate(
    campaignId,
    { currentAmount },
    { new: true },
    (err, updatedCampaign) => {
      if (err) {
        console.error('Error updating campaign:', err);
        return res.status(500).json({ error: 'Error updating campaign' });
      }

      res.status(200).json(updatedCampaign);
    }
  );
});

// Endpoint to delete a campaign
app.delete('/api/campaigns/:id', (req, res) => {
  const campaignId = req.params.id;

  Campaign.findByIdAndDelete(campaignId, (err, deletedCampaign) => {
    if (err) {
      console.error('Error deleting campaign:', err);
      return res.status(500).json({ error: 'Error deleting campaign' });
    }

    res.status(200).json(deletedCampaign);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
