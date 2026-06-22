import fs from 'fs';

async function run() {
  try {
    const payload = {
      city: "43944",
      roomsFilters: {
        guestNationality: "DZ",
        checkIn: "2026-06-23",
        checkOut: "2026-06-26",
        paxRooms: [{ adults: 1, children: 0, childrenAges: [] }],
        filters: { refundable: false, mealType: "All" }
      }
    };
    const initRes = await fetch('http://109.123.250.140:3001/api/search/init', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json());

    const esUrl = `http://109.123.250.140:3001/api/search/stream/${initRes.data.sessionId}`;
    const streamRes = await fetch(esUrl);
    const reader = streamRes.body.getReader();
    const decoder = new TextDecoder();
    let hotelId = null;
    let buffer = "";
    while (!hotelId) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value);
      const lines = buffer.split('\n');
      buffer = lines.pop();
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const dataStr = line.replace('data:', '').trim();
          if (dataStr) {
            try {
              const data = JSON.parse(dataStr);
              let parsedData = data;
              if (typeof data.data === 'string') parsedData = JSON.parse(data.data);
              else if (data.data) parsedData = data.data;
              if (parsedData.hotels && parsedData.hotels.length > 0) {
                hotelId = parsedData.hotels[0].id;
                break;
              }
            } catch (e) { }
          }
        }
      }
    }
    reader.cancel();

    const hotelPayload = {
      guestNationality: "DZ",
      checkIn: "2026-06-23",
      checkOut: "2026-06-26",
      paxRooms: [{ adults: 1, children: 0, childrenAges: [] }]
    };

    const detailRes = await fetch(`http://109.123.250.140:3001/api/search/hotels/${hotelId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hotelPayload)
    }).then(r => r.json());

    fs.writeFileSync('out.json', JSON.stringify(detailRes, null, 2));
    console.log("Written full details to out.json");

  } catch (err) {
    console.error(err);
  }
}
run();
