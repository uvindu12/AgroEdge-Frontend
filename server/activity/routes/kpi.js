// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/auth');

// // Temporary in-memory storage for reports (expires after 5 minutes)
// const reports = new Map();

// // Receive KPI data from ML system
// router.post('/report', (req, res) => {
//   try {
//     const reportData = req.body;
//     const { farm_id, final_score, kpis, recommendations } = reportData;

//     if (!farm_id) {
//       return res.status(400).json({ error: 'Farm ID (session ID) is required' });
//     }

//     // Store the report with a timestamp
//     const timestamp = Date.now();
//     reports.set(farm_id, { reportData, timestamp });

//     // Automatically delete the report after 5 minutes (300,000 ms)
//     setTimeout(() => {
//       reports.delete(farm_id);
//       console.log(`Report for session ${farm_id} has expired and been deleted.`);
//     }, 300000);

//     console.log(`Received and stored report for session ${farm_id}:`, reportData);
//     res.status(200).json({ status: 'Received successfully' });
//   } catch (error) {
//     console.error('Error receiving KPI report:', error);
//     res.status(500).json({ error: 'Server error receiving KPI report' });
//   }
// });

// // Fetch KPI report for a specific session (requires authentication)
// router.get('/report/:sessionId', authMiddleware, (req, res) => {
//   try {
//     const { sessionId } = req.params;
//     const reportEntry = reports.get(parseInt(sessionId));

//     if (!reportEntry) {
//       return res.status(404).json({ error: 'Report not found or expired' });
//     }

//     // Check if the report has expired (redundant due to setTimeout, but good practice)
//     const currentTime = Date.now();
//     const timeElapsed = currentTime - reportEntry.timestamp;
//     if (timeElapsed > 300000) {
//       reports.delete(parseInt(sessionId));
//       return res.status(404).json({ error: 'Report has expired' });
//     }

//     // Fetch farmer details from the session to include in the report
//     const Session = require('../models/Session');
//     Session.findOne({
//       where: {
//         id: sessionId,
//         user_id: req.userId, // Ensure the user has access to this session
//       },
//     }).then((session) => {
//       if (!session) {
//         return res.status(404).json({ error: 'Session not found or you do not have permission' });
//       }

//       const report = {
//         farmerName: session.farmer_name || 'Unknown Farmer', // Add farmer_name to Session model if needed
//         farmerId: `F-${session.id}`, // Construct a farmer ID (customize as needed)
//         finalScore: reportEntry.reportData.final_score,
//         criteria: Object.entries(reportEntry.reportData.kpis).map(([criterion, data]) => ({
//           criterion,
//           score: data.score,
//           weight: data.weight,
//           weightContribution: data.weighted_contribution,
//         })),
//         recommendations: reportEntry.reportData.recommendations,
//       };

//       res.status(200).json(report);
//     }).catch((error) => {
//       console.error('Error fetching session:', error);
//       res.status(500).json({ error: 'Server error fetching session data' });
//     });
//   } catch (error) {
//     console.error('Error fetching KPI report:', error);
//     res.status(500).json({ error: 'Server error fetching KPI report' });
//   }
// });

// module.exports = router;