# Cacophonie

## Endpoints
### Main endpoints
Management of bots : 
```
GET /bots - Get the list of all bots
POST /bots - Create a new bot
GET /bots/{botId} - Get info about a specified bot
PUT /bots/{botId} - Update a bot
DELETE /bots/{botId} - Delete abot
```

Management of bots status : 
```
GET /bots/{botId}/status - Get the status of a bot
PUT /bots/{botId}/status - Update the status of a bot (online, idle, invisible, doNotDisturb)
```
Management of Riverscript files :
```
GET /bots/{botId}/rivescript - Get Rivescript file of a bot
PUT /bots/{botId}/rivescript - Update Riverscript bot
```
Management of chats : 
```
GET /bots/{botId}/chats - Get chats of a bot 
```
### Bonus endpoint
Analysis of chats  :
```
GET /chats - Get all chats
GET /chats/analytics - Get analytics about chats
```
Monitoring : 
```
GET /monitoring - Get monitoring informations in real time
```