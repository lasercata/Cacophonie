# Cacophonie

## Endpoints
### Main endpoints
Management of bots : 
```
GET /bots - Get the list of all bots
POST /bots - Create a new bot
GET /bots/{botId} - Get info about a specified bot
PUT /bots/{botId} - Update a bot
DELETE /bots/{botId} - Delete a bot
```

Management of bots status : 
```
GET /bots/{botId}/status - Get the status of a bot
PUT /bots/{botId}/status - Update the status of a bot (online, idle, invisible, doNotDisturb)
```
Management of Riverscript files :
```
GET /bots/{botId}/rivescript - Get Rivescript file of a bot
PUT /bots/{botId}/rivescript - Update a Rivescript bot
```
Management of conversations : 
```
GET /bots/{botId}/conversations - Get conversations of a bot 
```
### Bonus endpoint
Analysis of conversations  :
```
GET /conversations - Get all conversations
GET /conversations/analytics - Get analytics about conversations
```
Monitoring : 
```
GET /monitoring - Get monitoring information in real time
```