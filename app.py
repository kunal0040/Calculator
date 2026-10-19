import webview
from pathlib import Path

html_file = Path(__file__).parent / "index.html"

webview.create_window(
    title="Calculator",
    url=html_file.as_uri(),
    width=420,
    height=620,
    min_size=(320, 500),
    resizable=True
)

webview.start()