package web

import (
	"embed"
	"fmt"
	"io/fs"
)

//go:embed dist
var embeddedFS embed.FS

var FS = func() fs.FS {
	frontendFS, err := fs.Sub(embeddedFS, "dist")
	if err != nil {
		// In a normal situation, this error is not possible, since we are using an explicit embed folder
		panic(fmt.Errorf("read build directory from embedded filesystem: %w", err))
	}

	return frontendFS
}()
