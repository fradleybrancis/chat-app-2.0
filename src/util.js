
export const makeMessageGroups = messages => {
  return messages.reduce((messageGroups, currentMessage) => {
      const currentBucket = messageGroups[messageGroups.length - 1];
      if (currentBucket && currentBucket.username === currentMessage.username) {
          currentBucket.messages.push(currentMessage);
      } else {
          messageGroups.push({
              username: currentMessage.username,
              messages: [currentMessage]
          });
      }
      return messageGroups;
  }, [])
}