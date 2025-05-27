# Cacophonie

## Endpoints
### Main endpoints
- Management of bots : 
```
GET /bots - Get the list of all bots
POST /bots - Create a new bot
GET /bots/{botId} - Get info about a specified bot
PATCH /bots/{botId} - Update a bot
DELETE /bots/{botId} - Delete a bot
```

- Management of bots status : 
<!-- ``` -->
<!-- GET /bots/{botId}/status - Get the status of a bot -->
<!-- PATCH /bots/{botId}/status - Update the status of a bot (online, idle, invisible, doNotDisturb) -->
<!-- ``` -->

The status is a property of `/bots/{botId}`.

- Management of Rivescript files :
<!-- ``` -->
<!-- GET /bots/{botId}/rivescript - Get Rivescript file of a bot -->
<!-- PATCH /bots/{botId}/rivescript - Update a Rivescript bot -->
<!-- ``` -->

The rivescript file is a property of `/bots/{botId}`.

- Management of conversations : 
```
GET /bots/{botId}/conversations - Get conversations of a bot 
```

### Bonus endpoints
- Analysis of conversations  :
```
GET /conversations - Get all conversations
GET /conversations/analytics - Get analytics about conversations
```

## Project Structure
```
cacophonie/
│
├── README.md
├── .gitignore
│
├── backend/  
│   ├── main.js      
│   ├── api/
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   ├── bots.js 
│   │   │   └── conversations.js 
│   │   │
│   │   ├── controllers/
│   │   │   ├── botController.js 
│   │   │   └── conversationController.js
│   │   │
│   │   ├── models/
│   │   │    ├── Bot.js
│   │   │    └── Conversation.js
│   │   │
│   │   └──docs/
│   │        ├── swagger.js
│   │        └── swagger.json # ?
│   │
│   ├── services/ #data_access in his repo
│   │   ├── robotService.js       
│   │   └── conversationService.js
│   │
│   ├── workers/
│   │   └── ?
│   │
│   ├── rivescript/
│   │   ├── bot1.js
│   │   ├── bot2.js
│   │   └── bot3.js
│   │
│   └── logs/
│       ├── bot1conversations.log
│       ├── bot2conversations.log
│       └── bot3conversations.log
│
└── frontend/
        ├── public/
        └── views/

 
```
