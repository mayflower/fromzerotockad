package search

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"google.golang.org/api/googleapi/transport"
	"google.golang.org/api/youtube/v3"
)

var maxResults = flag.Int64("max-results", 25, "Max YouTube results")

type Search struct {
	Pattern string
}

func SearchHandler(term string) map[string]string {
	client := &http.Client{
		Transport: &transport.APIKey{Key: os.Getenv("APIKEY")},
	}

	// dummy values
	v1 := map[string]string{"303_jC7h8sY": "Aggressive Leader", "6khjqQ0o8TY": "LGoony - Check (feat. Harry Quintana) prod. SOTT", "7ietHGxSrxA": "Blue Sky Szenario (Reworked)", "Ca-1gG_lqdY": "Streif", "GeXTVX1sqQc": "Keine Rolle", "GuEN9awwpWs": "Weiter", "SaXEu0U-6dk": "Harry Quintana - Weiter (Video Edit)", "T4EBTQjQMrQ": "Audi Sport TTk6YiENqc0:Nein", "ZManDyvZp4U": "Harry Quintana - Blue Sky Szenario (2020) Reupload", "ZPBRXxHmt_4": "Hand auf der Bibel", "Zx009bLCs_A": "Antizipieren (Remix)", "deajXxtjRqM": "Spirit of the Forest", "efQKHf9_Zg0": "Z4M", "f_YHaiKq3_Y": "Captain Planet", "gHEHY41nmEg": "Harry Quintana - El Camino (Bitches Come, Bitches Go)", "gOkI51e6oJI": "Immer Weiter", "lCGgkCznB8I": "Steady Pimpin&#39; is sein Job", "qKV5nPZKXuE": "Ingolstadt Village", "qmwDjelsYI0": "Harry Quintana - Batigol rGU40KKw1F4:White Collar Crime", "xYgxNLqel0w": "Das Kreutz (feat. Prezident) (Jay Baez Remix)", "y63xvyRse2g": "Harry Quintana - Quito"}
	if os.Getenv("APIKEY") == "SUPERSECRETKEY" {
		return v1
	}

	service, err := youtube.New(client)
	if err != nil {
		log.Fatalf("Error creating new YouTube client: %v", err)
	}

	// Make the API call to YouTube.
	call := service.Search.List([]string{"id,snippet"}).
		Q(term).
		MaxResults(*maxResults)
	response, err := call.Do()
	// Group video, channel, and playlist results in separate lists.
	videos := make(map[string]string)
	if err != nil {
		fmt.Println("error occurred", err)
		return videos
	}

	// Iterate through each item and add it to the correct list.
	for _, item := range response.Items {
		if item.Id.Kind == "youtube#video" {
			videos[item.Id.VideoId] = item.Snippet.Title
		}
	}

	return videos
}
