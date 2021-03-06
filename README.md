# CSCI2356Project

## Software Requirements

### <s>Interface</s>

- [x] I-01: P2 shall operate in the Chrome browser.
- [x] I-02: P2 shall communicate with the server using the http protocol.
- [x] I-03: P2 shall include Node.js server software.
- [x] I-04: P2 shall not include any database software.

### Client-Side

- [x] C-01: <s>One square key on the keyboard shall be 50px by 50px.</s> <strong>(terry said our size is okay which is not 50x50 - chris)</strong>
- [x] C-02: The space around each key (above, below, left, and right) shall
      be 25px.
- [x] C-03: The font size for all text, including on the keys, is 2 times the default
      font size. <strong>(i think we are good for this, not 100% sure - chris)</strong>
- [x] C-04: <s>The keyboard width must not go beyond 725px.</s> <strong>(terry said we good - chris)</strong>
- [x] C-05: A full keyboard shall be implemented and all the digits and all the uppercase and
      lowercase letters will be included.
- [x] C-06: Each key will expand to 2 times its dimensions when hovered.
- [x] C-07: The keyboard shall initially display lowercase keys.
- [x] C-08: A space will automatically be inserted after a word. **_"I took this to mean after a period (not including the word bank). - Devin"_**
- [x] C-09: A shift key shall be present.
- [x] C-10: When the shift key is pressed, the whole keyboard will change
      to uppercase letters.
- [x] C-11: Numeric and symbol keys may be organized so they are useable
      in one of the two uppercase or lowercase modes.
- [x] C-12: Once a key is clicked, the effect of the shift key is terminated.
- [x] C-13: A caps-lock toggle key shall be present.
- [x] C-14: The keyboard shall contain a word bank area.
- [x] C-15: The client shall be able to enter a word or phrase into the word
      bank by typing it out.
- [x] C-16: Every word or phrase in the word bank is visible to the user at
      the same time.
- [x] C-17: The colour scheme shall have a Montreal Canadians theme.
- [x] C-19: <s>P1 shall be modified so that when an edit toggle is
      clicked, all the Blog Number, Edit, and Publish columns disappear.</s> <strong>(terry said disabling them is okay as well - chris)</strong>
- [x] C-20: When an edit toggle is clicked, the text entry area and keyboard shall appear.
- [x] C-21: The text entry area shall be 8 lines tall.
- [x] C-22: The text entry area shall be above the keyboard.
- [x] C-23: The text entry area shall have a save button.
- [x] C-24: The text entry area shall have a cancel button.
- [x] C-25: The text entry area shall have a one-time undo button.
- [x] C-26: When the save button [C-23] is clicked a first warning shall
      enable the user to cancel or continue.
- [x] C-27: When the first warning's continue option [C-26] is selected, a
      second warning shall enable the user to cancel or continue.
- [x] C-28: When the <s>cancel</s> delete button [C-24] is clicked a first warning
      shall enable the user to cancel or continue.
- [x] C-29: When the first warning's continue option [C-28] is selected,
      a second warning shall enable the user to cancel or continue.

### <s>Server-Side</s>

- [x] S-01: The server shall maintain storage for each blog corresponding to [C-23].
- [x] S-02: The server shall maintain storage for the status of each publish
      toggle.
- [x] S-03: The blogs and publish buttons status shall be lost when
      the server program stops.
