package app

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"

	"github.com/amir-mhmd-najafi/URL-Shortner/database"
)

func Redirect(w http.ResponseWriter, r *http.Request, DB *sql.DB) {
	URL := strings.TrimPrefix(r.URL.Path, "/")
	switch URLLen := len(URL); URLLen {
	case 4:
		urlShortened(w, r, DB, URL)
	case 6:
		showLinkStatistics(w, r)
	case 0:
		home(w, r)
	default:
		fmt.Println("now")
		page404(w, r)
	}
}

// show home page
func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../ui/html/index.html")
}

// redirect to notShortened link
func urlShortened(w http.ResponseWriter, r *http.Request, DB *sql.DB, URL string) {
	LongURL, err := database.CheckExistsLink("notshortenedlink" ,"shortenedlink",URL, DB)
	// if not exists
	if LongURL == "" {
		page404(w, r)
		return
	}
	if err != nil {
		fmt.Println(err)
		return
	}
	http.Redirect(w, r, LongURL, http.StatusFound)
}

func showLinkStatistics(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "../ui/html/statistic.html")
}

func page404(w http.ResponseWriter, r *http.Request) {
	// w.WriteHeader(http.StatusNotFound)
	http.ServeFile(w, r, "../ui/html/404.html")
}
