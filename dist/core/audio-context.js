"use strict";

// monkeypatch old webAudioAPI
require("./ac-monkeypatch");

// exposes a single instance
var audioContext;

if (AudioContext) audioContext = new AudioContext();

module.exports = audioContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi91dGlscy9zY2hlZHVsaW5nLXF1ZXVlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzs7QUFHNUIsSUFBSSxZQUFZLENBQUM7O0FBRWpCLElBQUcsWUFBWSxFQUNiLFlBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztBQUVwQyxNQUFNLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiJlczYvdXRpbHMvc2NoZWR1bGluZy1xdWV1ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIG1vbmtleXBhdGNoIG9sZCB3ZWJBdWRpb0FQSVxucmVxdWlyZSgnLi9hYy1tb25rZXlwYXRjaCcpO1xuXG4vLyBleHBvc2VzIGEgc2luZ2xlIGluc3RhbmNlXG52YXIgYXVkaW9Db250ZXh0O1xuXG5pZihBdWRpb0NvbnRleHQpXG4gIGF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhdWRpb0NvbnRleHQ7Il19