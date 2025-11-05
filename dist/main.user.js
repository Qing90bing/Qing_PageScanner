// ==UserScript==
// @name         网页文本提取工具
// @name:en-US   Web Text Extraction Tool
// @namespace    https://github.com/Qing90bing/Qing_PageScanner
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  像扫描仪一样快速“扫描”整个网页，智能识别并捕获所有需要翻译的文本片段，提高你的翻译效率。
// @description:en-US  Scan the entire web page like a scanner, intelligently identify and capture all text fragments that need translation.
// @license      MIT
// @copyright    2025, Qing90bing
// @author       Qing90bing
// @icon         data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiID8+DQo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iNjYxcHQiIGhlaWdodD0iNjYxcHQiIHZpZXdCb3g9IjAgMCA2NjEgNjYxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8ZyBpZD0iIzAwNzBjMGZmIj4NCjxwYXRoIGZpbGw9IiMwMDcwYzAiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDE2MC43MiAwLjAwIEwgNTAwLjI3IDAuMDAgQyA1MjAuMTYgMS41NiA1MzkuOTYgNS42NiA1NTguMjkgMTMuNjkgQyA2MDEuNTAgMzIuMDIgNjM2LjIxIDY5LjE2IDY1MS41MiAxMTMuNTQgQyA2NTYuOTcgMTI4LjcxIDY1OS42NCAxNDQuNzEgNjYxLjAwIDE2MC43MiBMIDY2MS4wMCA1MDAuMjcgQyA2NTkuNTEgNTE4LjYyIDY1Ni4wMiA1MzYuOTIgNjQ5LjA2IDU1NC4wMyBDIDYzMi4yMiA1OTYuOTcgNTk2Ljk3IDYzMi4yMiA1NTQuMDMgNjQ5LjA2IEMgNTM2LjkzIDY1Ni4wMiA1MTguNjMgNjU5LjUxIDUwMC4yOCA2NjEuMDAgTCAxNjAuNzMgNjYxLjAwIEMgMTQyLjM4IDY1OS41MSAxMjQuMDggNjU2LjAyIDEwNi45NyA2NDkuMDYgQyA2NC4wMyA2MzIuMjIgMjguNzggNTk2Ljk3IDExLjk0IDU1NC4wMyBDIDQuOTggNTM2LjkzIDEuNDkgNTE4LjYzIDAuMDAgNTAwLjI4IEwgMC4wMCAxNjAuNzMgQyAxLjc1IDEzNi44MiA3LjY3IDExMy4xMSAxOC44MyA5MS44MSBDIDM0LjgzIDYwLjcxIDYwLjcxIDM0LjgzIDkxLjgxIDE4LjgzIEMgMTEzLjEwIDcuNjcgMTM2LjgyIDEuNzUgMTYwLjcyIDAuMDAgTSAxNTIuNDAgMTIuNDMgQyAxMTEuNzIgMTYuNjYgNzMuMDcgMzcuNTQgNDcuMzIgNjkuMzMgQyAyNy44NyA5Mi44MCAxNS42NyAxMjIuMTEgMTIuNDMgMTUyLjQwIEMgMTEuNDYgMTYyLjIzIDExLjY4IDE3Mi4xMyAxMS42NSAxODIuMDAgQyAxMS42NiAyNzYuMDAgMTEuNjUgMzcwLjAwIDExLjY1IDQ2NC4wMCBDIDExLjk2IDQ4My4yMCAxMC40NCA1MDIuNjUgMTQuMzggNTIxLjYwIEMgMjEuMjcgNTU3LjY3IDQxLjI2IDU5MS4xMCA2OS44OSA2MTQuMTMgQyA5My43MiA2MzMuNjUgMTIzLjQ0IDY0NS44MyAxNTQuMTAgNjQ4LjczIEMgMTY2LjA0IDY0OS42NyAxNzguMDMgNjQ5LjI2IDE5MC4wMCA2NDkuMzUgQyAyOTEuMzIgNjQ5LjMyIDM5Mi42NCA2NDkuNDAgNDkzLjk3IDY0OS4zMSBDIDUzOS44MSA2NDkuMjMgNTg0Ljg2IDYyNy4yMiA2MTMuNjggNTkxLjY3IEMgNjM2LjE2IDU2NC40MiA2NDkuMjAgNTI5LjM1IDY0OS4zMCA0OTMuOTcgQyA2NDkuNDEgMzg5LjMxIDY0OS4zMSAyODQuNjYgNjQ5LjM1IDE4MC4wMCBDIDY0OS4zNCAxNzEuMDggNjQ5LjQ2IDE2Mi4xNCA2NDguNjUgMTUzLjI0IEMgNjQ1LjUxIDEyMS45MyA2MzIuNjkgOTEuNjcgNjEyLjMxIDY3LjY4IEMgNTg4LjQ3IDM5LjEzIDU1NC4xNCAxOS42MiA1MTcuNDQgMTMuNjMgQyA1MDQuNDMgMTEuMjkgNDkxLjE2IDExLjY4IDQ3OC4wMCAxMS42NSBDIDM3OS42NyAxMS42NSAyODEuMzQgMTEuNjUgMTgzLjAwIDExLjY1IEMgMTcyLjgwIDExLjY4IDE2Mi41NyAxMS40NCAxNTIuNDAgMTIuNDMgWiIgLz4NCjwvZz4NCjxnIGlkPSIjMDVhNmYwZmYiPg0KPHBhdGggZmlsbD0iIzA1YTZmMCIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMTUyLjQwIDEyLjQzIEMgMTYyLjU3IDExLjQ0IDE3Mi44MCAxMS42OCAxODMuMDAgMTEuNjUgQyAyODEuMzQgMTEuNjUgMzc5LjY3IDExLjY1IDQ3OC4wMCAxMS42NSBDIDQ5MS4xNiAxMS42OCA1MDQuNDMgMTEuMjkgNTE3LjQ0IDEzLjYzIEMgNTU0LjE0IDE5LjYyIDU4OC40NyAzOS4xMyA2MTIuMzEgNjcuNjggQyA2MzIuNjkgOTEuNjcgNjQ1LjUxIDEyMS45MyA2NDguNjUgMTUzLjI0IEMgNjQ5LjQ2IDE2Mi4xNCA2NDkuMzQgMTcxLjA4IDY0OS4zNSAxODAuMDAgQyA2NDkuMzEgMjg0LjY2IDY0OS40MSAzODkuMzEgNjQ5LjMwIDQ5My45NyBDIDY0OS4yMCA1MjkuMzUgNjM2LjE2IDU2NC40MiA2MTMuNjggNTkxLjY3IEMgNTg0Ljg2IDYyNy4yMiA1MzkuODEgNjQ5LjIzIDQ5My45NyA2NDkuMzEgQyAzOTIuNjQgNjQ5LjQwIDI5MS4zMiA2NDkuMzIgMTkwLjAwIDY0OS4zNSBDIDE3OC4wMyA2NDkuMjYgMTY2LjA0IDY0OS42NyAxNTQuMTAgNjQ4LjczIEMgMTIzLjQ0IDY0NS44MyA5My43MiA2MzMuNjUgNjkuODkgNjE0LjEzIEMgNDEuMjYgNTkxLjEwIDIxLjI3IDU1Ny42NyAxNC4zOCA1MjEuNjAgQyAxMC40NCA1MDIuNjUgMTEuOTYgNDgzLjIwIDExLjY1IDQ2NC4wMCBDIDExLjY1IDM3MC4wMCAxMS42NiAyNzYuMDAgMTEuNjUgMTgyLjAwIEMgMTEuNjggMTcyLjEzIDExLjQ2IDE2Mi4yMyAxMi40MyAxNTIuNDAgQyAxNS42NyAxMjIuMTEgMjcuODcgOTIuODAgNDcuMzIgNjkuMzMgQyA3My4wNyAzNy41NCAxMTEuNzIgMTYuNjYgMTUyLjQwIDEyLjQzIE0gMzg2Ljk5IDEyNC45OCBDIDM3My42NSAxMzguMDAgMzYwLjg1IDE1MS41OCAzNDcuMjYgMTY0LjM0IEMgMzM4Ljc5IDE1Ni4yNyAzMzAuNTkgMTQ3LjkzIDMyMi4xMCAxMzkuODggQyAzMTYuMDAgMTQ1LjkzIDMwOS44NyAxNTEuOTYgMzAzLjc4IDE1OC4wMyBDIDMwOS43MSAxNjQuNDcgMzE2LjI2IDE3MC4zMCAzMjIuMTIgMTc2Ljc5IEMgMjg0LjA5IDIxNC44NiAyNDYuMDUgMjUyLjkyIDIwNy45NyAyOTAuOTMgQyAyMDUuMDkgMjkzLjQ4IDIwNS42MyAyOTcuNTYgMjA1LjU2IDMwMS4wMCBDIDIwNS44MCAzMTkuMDYgMjA1LjQ1IDMzNy4xMiAyMDUuNzQgMzU1LjE4IEMgMjIzLjg5IDM1NS4zMSAyNDIuMDQgMzU1LjQwIDI2MC4xOCAzNTUuMTMgQyAyNTQuODEgMzQ2LjgxIDI0OS41NyAzMzguMzggMjQ1LjY0IDMyOS4yNyBDIDI0MS4wMyAzMjkuMTEgMjM2LjQyIDMyOS4xNSAyMzEuODEgMzI5LjA1IEMgMjMxLjc3IDMyMi4wMSAyMzEuNTcgMzE0Ljk2IDIzMS43MSAzMDcuOTIgQyAyMzEuMzIgMzAyLjQxIDIzNi43MyAyOTkuNDggMjM5Ljk5IDI5NS45NSBDIDI3My43NiAyNjIuNjAgMzA2Ljk5IDIyOC42OSAzNDAuODkgMTk1LjQ1IEMgMzU5LjUxIDIxMy43NSAzNzcuODQgMjMyLjM0IDM5Ni4zMyAyNTAuNzcgQyA0MDIuMTYgMjQ0LjczIDQwOC41NyAyMzkuMjEgNDEzLjk4IDIzMi44MCBDIDQxMi41OSAyMjkuNzggNDEwLjAyIDIyNy41OCA0MDcuNzIgMjI1LjI3IEMgNDAzLjg5IDIyMS41NyA0MDAuMjUgMjE3LjY3IDM5Ni42NSAyMTMuNzQgQyA0MDYuNjEgMjAzLjAyIDQxNy4yOCAxOTIuOTggNDI3LjUzIDE4Mi41MyBDIDQzMS40MCAxNzguNDIgNDM2LjA0IDE3NC45MCA0MzguOTYgMTcwLjAwIEMgNDQxLjkwIDE2NC43NiA0NDAuMjEgMTU4LjAzIDQzNi4wMSAxNTMuOTkgQyA0MjcuNDQgMTQ1LjIzIDQxOC42MiAxMzYuNzEgNDEwLjA2IDEyNy45NCBDIDQwNi43NSAxMjQuNTkgNDAzLjAwIDEyMC45MCAzOTguMDEgMTIwLjYxIEMgMzkzLjg2IDEyMC4xOCAzODkuODkgMTIyLjEzIDM4Ni45OSAxMjQuOTggTSAzNDkuNDMgMjY0LjY3IEMgMzE2LjYxIDI2OC42MSAyODUuMzYgMjg5LjM5IDI3Mi4xNiAzMjAuMTcgQyAyNzAuMzYgMzIzLjczIDI3My4xOCAzMjcuMjMgMjc0LjYxIDMzMC4zNyBDIDI5MC45OCAzNjIuMTUgMzI2LjY4IDM4MS41NiAzNjIuMDAgMzgxLjM5IEMgMzk3LjM4IDM4MS45MCA0MzMuMzIgMzYyLjcxIDQ0OS45MCAzMzAuOTggQyA0NTEuMzYgMzI3LjYzIDQ1NC41OSAzMjQuMDAgNDUyLjc4IDMyMC4xOSBDIDQ0NC44OCAzMDIuMTcgNDMwLjgyIDI4Ny4wMCA0MTMuNjYgMjc3LjQzIEMgMzk0LjQyIDI2Ni4yMiAzNzEuNDcgMjYxLjk5IDM0OS40MyAyNjQuNjcgTSAxNjQuMDEgNDI1LjAzIEMgMTY0LjAwIDQ1NC43NyAxNjMuOTcgNDg0LjUxIDE2NC4wMyA1MTQuMjUgQyAxNzEuMjQgNTE0LjQ1IDE3OC40NyA1MTQuNDkgMTg1LjY4IDUxNC4xNSBDIDE4NS42OCA1MDEuODUgMTg1LjQ1IDQ4OS41NSAxODUuODAgNDc3LjI1IEMgMTk1LjI3IDQ3Ny4yNyAyMDQuNzQgNDc3LjI5IDIxNC4yMiA0NzcuMjQgQyAyMTQuNTMgNDg5LjU0IDIxNC4zMyA1MDEuODUgMjE0LjMxIDUxNC4xNSBDIDIyMS41MyA1MTQuNDkgMjI4Ljc2IDUxNC40NSAyMzUuOTcgNTE0LjI1IEMgMjM2LjAzIDQ4NC41MSAyMzYuMDEgNDU0Ljc3IDIzNS45OCA0MjUuMDMgQyAyMjguNzYgNDI0Ljk2IDIyMS41MyA0MjQuOTMgMjE0LjMwIDQyNS4xMSBDIDIxNC4zNSA0MzUuMDMgMjE0LjQ5IDQ0NC45NSAyMTQuMjQgNDU0Ljg2IEMgMjA0Ljc1IDQ1NC44NyAxOTUuMjUgNDU0Ljg3IDE4NS43NiA0NTQuODYgQyAxODUuNTEgNDQ0Ljk0IDE4NS42NSA0MzUuMDMgMTg1LjY5IDQyNS4xMSBDIDE3OC40NyA0MjQuOTMgMTcxLjI0IDQyNC45NiAxNjQuMDEgNDI1LjAzIE0gMjUwLjMxIDQyNS4xMCBDIDI1MC4zOCA0MzIuNDYgMjUwLjM3IDQzOS44MSAyNTAuMzIgNDQ3LjE2IEMgMjU4Ljc2IDQ0Ny41NCAyNjcuMjIgNDQ3LjMyIDI3NS42NyA0NDcuMzQgQyAyNzUuNjggNDY5LjY0IDI3NS41MCA0OTEuOTQgMjc1Ljc1IDUxNC4yNCBDIDI4Mi44NCA1MTQuNDUgMjg5Ljk0IDUxNC40NCAyOTcuMDQgNTE0LjI1IEMgMjk3LjMxIDQ5MS45NCAyOTcuMDAgNDY5LjYyIDI5Ny4xOSA0NDcuMzAgQyAzMDUuNTQgNDQ3LjM4IDMxMy44OSA0NDcuNDUgMzIyLjI0IDQ0Ny4yNiBDIDMyMi40NSA0MzkuODUgMzIyLjQ0IDQzMi40MyAzMjIuMjYgNDI1LjAzIEMgMjk4LjI4IDQyNS4wMyAyNzQuMjkgNDI0Ljg4IDI1MC4zMSA0MjUuMTAgTSAzNDAuNjYgNDI5LjY3IEMgMzM2Ljg5IDQzMy40MSAzMzYuNjQgNDM5LjAyIDMzNi42NyA0NDQuMDEgQyAzMzYuODUgNDY3LjQyIDMzNi41NyA0OTAuODMgMzM2LjgyIDUxNC4yNCBDIDM0My45NiA1MTQuNDQgMzUxLjExIDUxNC40NSAzNTguMjUgNTE0LjI0IEMgMzU4LjUwIDQ5MS45NCAzNTguMzIgNDY5LjY0IDM1OC4zNCA0NDcuMzQgQyAzNjMuMTMgNDQ3LjM2IDM2Ny45MiA0NDcuMzYgMzcyLjcyIDQ0Ny4zMyBDIDM3Mi44MSA0NjQuNjYgMzcyLjU5IDQ4MS45OSAzNzIuODIgNDk5LjMyIEMgMzc5Ljk3IDQ5OS41NSAzODcuMTIgNDk5LjU0IDM5NC4yNyA0OTkuMzMgQyAzOTQuNDggNDgyLjAwIDM5NC4zMyA0NjQuNjcgMzk0LjM0IDQ0Ny4zNCBDIDM5OS4xMyA0NDcuMzYgNDAzLjkyIDQ0Ny4zNiA0MDguNzIgNDQ3LjMzIEMgNDA4LjgwIDQ2OS42MyA0MDguNTkgNDkxLjk0IDQwOC44MiA1MTQuMjUgQyA0MTUuOTYgNTE0LjQ0IDQyMy4xMSA1MTQuNDUgNDMwLjI2IDUxNC4yNCBDIDQzMC41NCA0OTAuODMgNDMwLjIzIDQ2Ny40MiA0MzAuNDIgNDQ0LjAxIEMgNDMwLjQ0IDQzOS4wMCA0MzAuMTggNDMzLjM3IDQyNi4zOSA0MjkuNjIgQyA0MjMuMzYgNDI2LjA3IDQxOC41NSA0MjQuOTcgNDE0LjA3IDQyNS4wMCBDIDM5NC4wMyA0MjQuOTcgMzczLjk5IDQyNS4wMyAzNTMuOTUgNDI0Ljk3IEMgMzQ5LjE2IDQyNC44OCAzNDMuOTIgNDI1Ljg1IDM0MC42NiA0MjkuNjcgTSA0NTEuOTEgNDI1LjA0IEMgNDUxLjg2IDQ1NC43OCA0NTEuNzUgNDg0LjUyIDQ1MS45NyA1MTQuMjYgQyA0NzEuMDggNTE0LjQzIDQ5MC4yMSA1MTQuNDMgNTA5LjMzIDUxNC4yNyBDIDUwOS41NCA1MDYuODkgNTA5LjU1IDQ5OS41MSA1MDkuMzAgNDkyLjEzIEMgNDk3LjQyIDQ5Mi4wOCA0ODUuNTQgNDkyLjI1IDQ3My42NiA0OTIuMDUgQyA0NzMuNDQgNDY5Ljc0IDQ3My41MSA0NDcuNDQgNDczLjY0IDQyNS4xMyBDIDQ2Ni40MCA0MjQuOTIgNDU5LjE1IDQyNC45NiA0NTEuOTEgNDI1LjA0IFoiIC8+DQo8cGF0aCBmaWxsPSIjMDVhNmYwIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAzODEuOTggMTY2Ljk4IEMgMzg3LjE1IDE2MS44NyAzOTIuMDkgMTU2LjUyIDM5Ny41NyAxNTEuNzMgQyA0MDEuNDggMTU1LjU5IDQwNS4zNyAxNTkuNDggNDA5LjI1IDE2My4zOSBDIDQwNC4wNCAxNjkuMTQgMzk4LjEzIDE3NC4xOSAzOTIuNTMgMTc5LjU0IEMgMzg3LjIyIDE4NC40NSAzODIuMjEgMTg5LjY5IDM3Ni41MyAxOTQuMTkgQyAzNzMuMTAgMTkwLjQ2IDM2OS42NSAxODYuNzUgMzY2LjI3IDE4Mi45NyBDIDM3MS4yOSAxNzcuNDMgMzc2LjcwIDE3Mi4yNyAzODEuOTggMTY2Ljk4IFoiIC8+DQo8cGF0aCBmaWxsPSIjMDVhNmYwIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAzMDYuNjAgMzE0LjU2IEMgMzIwLjIwIDI5OS4yMyAzNDAuNTQgMjkwLjMxIDM2MC45NyAyOTAuMDIgQyAzODUuODAgMjg5LjQwIDQxMS4wNiAzMDEuNjMgNDI0LjQ4IDMyMi44MSBDIDQxNi4zOSAzMzQuNjUgNDA0Ljk0IDM0NC4yMSAzOTEuNTggMzQ5LjU1IEMgMzcwLjE5IDM1OC40OSAzNDQuNzUgMzU2Ljg4IDMyNC42NCAzNDUuMzggQyAzMTUuMTcgMzM5Ljg0IDMwNi41MSAzMzIuMzIgMzAwLjgwIDMyMi44OCBDIDMwMS45NCAzMTkuNjQgMzA0LjM4IDMxNy4xMCAzMDYuNjAgMzE0LjU2IE0gMzU4LjM5IDMwMy41MSBDIDM0OS4wOCAzMDUuMjMgMzQyLjA0IDMxNC41OSAzNDIuOTcgMzI0LjAyIEMgMzQzLjI1IDMzNC4xOSAzNTIuODggMzQyLjgzIDM2My4wMSAzNDIuMTYgQyAzNzQuMjQgMzQyLjM1IDM4My42MSAzMzEuMDkgMzgxLjg0IDMyMC4wOSBDIDM4MC43NyAzMDkuMTIgMzY5LjA5IDMwMC45MyAzNTguMzkgMzAzLjUxIFoiIC8+DQo8L2c+DQo8ZyBpZD0iI2ZmZmZmZmZmIj4NCjxwYXRoIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjEuMDAiIGQ9IiBNIDM4Ni45OSAxMjQuOTggQyAzODkuODkgMTIyLjEzIDM5My44NiAxMjAuMTggMzk4LjAxIDEyMC42MSBDIDQwMy4wMCAxMjAuOTAgNDA2Ljc1IDEyNC41OSA0MTAuMDYgMTI3Ljk0IEMgNDE4LjYyIDEzNi43MSA0MjcuNDQgMTQ1LjIzIDQzNi4wMSAxNTMuOTkgQyA0NDAuMjEgMTU4LjAzIDQ0MS45MCAxNjQuNzYgNDM4Ljk2IDE3MC4wMCBDIDQzNi4wNCAxNzQuOTAgNDMxLjQwIDE3OC40MiA0MjcuNTMgMTgyLjUzIEMgNDE3LjI4IDE5Mi45OCA0MDYuNjEgMjAzLjAyIDM5Ni42NSAyMTMuNzQgQyA0MDAuMjUgMjE3LjY3IDQwMy44OSAyMjEuNTcgNDA3LjcyIDIyNS4yNyBDIDQxMC4wMiAyMjcuNTggNDEyLjU5IDIyOS43OCA0MTMuOTggMjMyLjgwIEMgNDA4LjU3IDIzOS4yMSA0MDIuMTYgMjQ0LjczIDM5Ni4zMyAyNTAuNzcgQyAzNzcuODQgMjMyLjM0IDM1OS41MSAyMTMuNzUgMzQwLjg5IDE5NS40NSBDIDMwNi45OSAyMjguNjkgMjczLjc2IDI2Mi42MCAyMzkuOTkgMjk1Ljk1IEMgMjM2LjczIDI5OS40OCAyMzEuMzIgMzAyLjQxIDIzMS43MSAzMDcuOTIgQyAyMzEuNTcgMzE0Ljk2IDIzMS43NyAzMjIuMDEgMjMxLjgxIDMyOS4wNSBDIDIzNi40MiAzMjkuMTUgMjQxLjAzIDMyOS4xMSAyNDUuNjQgMzI5LjI3IEMgMjQ5LjU3IDMzOC4zOCAyNTQuODEgMzQ2LjgxIDI2MC4xOCAzNTUuMTMgQyAyNDIuMDQgMzU1LjQwIDIyMy44OSAzNTUuMzEgMjA1Ljc0IDM1NS4xOCBDIDIwNS40NSAzMzcuMTIgMjA1LjgwIDMxOS4wNiAyMDUuNTYgMzAxLjAwIEMgMjA1LjYzIDI5Ny41NiAyMDUuMDkgMjkzLjQ4IDIwNy45NyAyOTAuOTMgQyAyNDYuMDUgMjUyLjkyIDI4NC4wOSAyMTQuODYgMzIyLjEyIDE3Ni43OSBDIDMxNi4yNiAxNzAuMzAgMzA5LjcxIDE2NC40NyAzMDMuNzggMTU4LjAzIEMgMzA5Ljg3IDE1MS45NiAzMTYuMDAgMTQ1LjkzIDMyMi4xMCAxMzkuODggQyAzMzAuNTkgMTQ3LjkzIDMzOC43OSAxNTYuMjcgMzQ3LjI2IDE2NC4zNCBDIDM2MC44NSAxNTEuNTggMzczLjY1IDEzOC4wMCAzODYuOTkgMTI0Ljk4IE0gMzgxLjk4IDE2Ni45OCBDIDM3Ni43MCAxNzIuMjcgMzcxLjI5IDE3Ny40MyAzNjYuMjcgMTgyLjk3IEMgMzY5LjY1IDE4Ni43NSAzNzMuMTAgMTkwLjQ2IDM3Ni41MyAxOTQuMTkgQyAzODIuMjEgMTg5LjY5IDM4Ny4yMiAxODQuNDUgMzkyLjUzIDE3OS41NCBDIDM5OC4xMyAxNzQuMTkgNDA0LjA0IDE2OS4xNCA0MDkuMjUgMTYzLjM5IEMgNDA1LjM3IDE1OS40OCA0MDEuNDggMTU1LjU5IDM5Ny41NyAxNTEuNzMgQyAzOTIuMDkgMTU2LjUyIDM4Ny4xNSAxNjEuODcgMzgxLjk4IDE2Ni45OCBaIiAvPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzQ5LjQzIDI2NC42NyBDIDM3MS40NyAyNjEuOTkgMzk0LjQyIDI2Ni4yMiA0MTMuNjYgMjc3LjQzIEMgNDMwLjgyIDI4Ny4wMCA0NDQuODggMzAyLjE3IDQ1Mi43OCAzMjAuMTkgQyA0NTQuNTkgMzI0LjAwIDQ1MS4zNiAzMjcuNjMgNDQ5LjkwIDMzMC45OCBDIDQzMy4zMiAzNjIuNzEgMzk3LjM4IDM4MS45MCAzNjIuMDAgMzgxLjM5IEMgMzI2LjY4IDM4MS41NiAyOTAuOTggMzYyLjE1IDI3NC42MSAzMzAuMzcgQyAyNzMuMTggMzI3LjIzIDI3MC4zNiAzMjMuNzMgMjcyLjE2IDMyMC4xNyBDIDI4NS4zNiAyODkuMzkgMzE2LjYxIDI2OC42MSAzNDkuNDMgMjY0LjY3IE0gMzA2LjYwIDMxNC41NiBDIDMwNC4zOCAzMTcuMTAgMzAxLjk0IDMxOS42NCAzMDAuODAgMzIyLjg4IEMgMzA2LjUxIDMzMi4zMiAzMTUuMTcgMzM5Ljg0IDMyNC42NCAzNDUuMzggQyAzNDQuNzUgMzU2Ljg4IDM3MC4xOSAzNTguNDkgMzkxLjU4IDM0OS41NSBDIDQwNC45NCAzNDQuMjEgNDE2LjM5IDMzNC42NSA0MjQuNDggMzIyLjgxIEMgNDExLjA2IDMwMS42MyAzODUuODAgMjg5LjQwIDM2MC45NyAyOTAuMDIgQyAzNDAuNTQgMjkwLjMxIDMyMC4yMCAyOTkuMjMgMzA2LjYwIDMxNC41NiBaIiAvPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzU4LjM5IDMwMy41MSBDIDM2OS4wOSAzMDAuOTMgMzgwLjc3IDMwOS4xMiAzODEuODQgMzIwLjA5IEMgMzgzLjYxIDMzMS4wOSAzNzQuMjQgMzQyLjM1IDM2My4wMSAzNDIuMTYgQyAzNTIuODggMzQyLjgzIDM0My4yNSAzMzQuMTkgMzQyLjk3IDMyNC4wMiBDIDM0Mi4wNCAzMTQuNTkgMzQ5LjA4IDMwNS4yMyAzNTguMzkgMzAzLjUxIFoiIC8+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAxNjQuMDEgNDI1LjAzIEMgMTcxLjI0IDQyNC45NiAxNzguNDcgNDI0LjkzIDE4NS42OSA0MjUuMTEgQyAxODUuNjUgNDM1LjAzIDE4NS41MSA0NDQuOTQgMTg1Ljc2IDQ1NC44NiBDIDE5NS4yNSA0NTQuODcgMjA0Ljc1IDQ1NC44NyAyMTQuMjQgNDU0Ljg2IEMgMjE0LjQ5IDQ0NC45NSAyMTQuMzUgNDM1LjAzIDIxNC4zMCA0MjUuMTEgQyAyMjEuNTMgNDI0LjkzIDIyOC43NiA0MjQuOTYgMjM1Ljk4IDQyNS4wMyBDIDIzNi4wMSA0NTQuNzcgMjM2LjAzIDQ4NC41MSAyMzUuOTcgNTE0LjI1IEMgMjI4Ljc2IDUxNC40NSAyMjEuNTMgNTE0LjQ5IDIxNC4zMSA1MTQuMTUgQyAyMTQuMzMgNTAxLjg1IDIxNC41MyA0ODkuNTQgMjE0LjIyIDQ3Ny4yNCBDIDIwNC43NCA0NzcuMjkgMTk1LjI3IDQ3Ny4yNyAxODUuODAgNDc3LjI1IEMgMTg1LjQ1IDQ4OS41NSAxODUuNjggNTAxLjg1IDE4NS42OCA1MTQuMTUgQyAxNzguNDcgNTE0LjQ5IDE3MS4yNCA1MTQuNDUgMTY0LjAzIDUxNC4yNSBDIDE2My45NyA0ODQuNTEgMTY0LjAwIDQ1NC43NyAxNjQuMDEgNDI1LjAzIFoiIC8+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSAyNTAuMzEgNDI1LjEwIEMgMjc0LjI5IDQyNC44OCAyOTguMjggNDI1LjAzIDMyMi4yNiA0MjUuMDMgQyAzMjIuNDQgNDMyLjQzIDMyMi40NSA0MzkuODUgMzIyLjI0IDQ0Ny4yNiBDIDMxMy44OSA0NDcuNDUgMzA1LjU0IDQ0Ny4zOCAyOTcuMTkgNDQ3LjMwIEMgMjk3LjAwIDQ2OS42MiAyOTcuMzEgNDkxLjk0IDI5Ny4wNCA1MTQuMjUgQyAyODkuOTQgNTE0LjQ0IDI4Mi44NCA1MTQuNDUgMjc1Ljc1IDUxNC4yNCBDIDI3NS41MCA0OTEuOTQgMjc1LjY4IDQ2OS42NCAyNzUuNjcgNDQ3LjM0IEMgMjY3LjIyIDQ0Ny4zMiAyNTguNzYgNDQ3LjU0IDI1MC4zMiA0NDcuMTYgQyAyNTAuMzcgNDM5LjgxIDI1MC4zOCA0MzIuNDYgMjUwLjMxIDQyNS4xMCBaIiAvPg0KPHBhdGggZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMS4wMCIgZD0iIE0gMzQwLjY2IDQyOS42NyBDIDM0My45MiA0MjUuODUgMzQ5LjE2IDQyNC44OCAzNTMuOTUgNDI0Ljk3IEMgMzczLjk5IDQyNS4wMyAzOTQuMDMgNDI0Ljk3IDQxNC4wNyA0MjUuMDAgQyA0MTguNTUgNDI0Ljk3IDQyMy4zNiA0MjYuMDcgNDI2LjM5IDQyOS42MiBDIDQzMC4xOCA0MzMuMzcgNDMwLjQ0IDQzOS4wMCA0MzAuNDIgNDQ0LjAxIEMgNDMwLjIzIDQ2Ny40MiA0MzAuNTQgNDkwLjgzIDQzMC4yNiA1MTQuMjQgQyA0MjMuMTEgNTE0LjQ1IDQxNS45NiA1MTQuNDQgNDA4LjgyIDUxNC4yNSBDIDQwOC41OSA0OTEuOTQgNDA4LjgwIDQ2OS42MyA0MDguNzIgNDQ3LjMzIEMgNDAzLjkyIDQ0Ny4zNiAzOTkuMTMgNDQ3LjM2IDM5NC4zNCA0NDcuMzQgQyAzOTQuMzMgNDY0LjY3IDM5NC40OCA0ODIuMDAgMzk0LjI3IDQ5OS4zMyBDIDM4Ny4xMiA0OTkuNTQgMzc5Ljk3IDQ5OS41NSAzNzIuODIgNDk5LjMyIEMgMzcyLjU5IDQ4MS45OSAzNzIuODEgNDY0LjY2IDM3Mi43MiA0NDcuMzMgQyAzNjcuOTIgNDQ3LjM2IDM2My4xMyA0NDcuMzYgMzU4LjM0IDQ0Ny4zNCBDIDM1OC4zMiA0NjkuNjQgMzU4LjUwIDQ5MS45NCAzNTguMjUgNTE0LjI0IEMgMzUxLjExIDUxNC40NSAzNDMuOTYgNTE0LjQ0IDMzNi44MiA1MTQuMjQgQyAzMzYuNTcgNDkwLjgzIDMzNi44NSA0NjcuNDIgMzM2LjY3IDQ0NC4wMSBDIDMzNi42NCA0MzkuMDIgMzM2Ljg5IDQzMy40MSAzNDAuNjYgNDI5LjY3IFoiIC8+DQo8cGF0aCBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIxLjAwIiBkPSIgTSA0NTEuOTEgNDI1LjA0IEMgNDU5LjE1IDQyNC45NiA0NjYuNDAgNDI0LjkyIDQ3My42NCA0MjUuMTMgQyA0NzMuNTEgNDQ3LjQ0IDQ3My40NCA0NjkuNzQgNDczLjY2IDQ5Mi4wNSBDIDQ4NS41NCA0OTIuMjUgNDk3LjQyIDQ5Mi4wOCA1MDkuMzAgNDkyLjEzIEMgNTA5LjU1IDQ5OS41MSA1MDkuNTQgNTA2Ljg5IDUwOS4zMyA1MTQuMjcgQyA0OTAuMjEgNTE0LjQzIDQ3MS4wOCA1MTQuNDMgNDUxLjk3IDUxNC4yNiBDIDQ1MS43NSA0ODQuNTIgNDUxLjg2IDQ1NC43OCA0NTEuOTEgNDI1LjA0IFoiIC8+DQo8L2c+DQo8L3N2Zz4NCg==
// @supportURL   https://github.com/Qing90bing/Qing_PageScanner/issues
// @match        *://*/*
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// ==/UserScript==


var TextExtractor = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var main_exports = {};
  __export(main_exports, {
    initUI: () => initUI,
    initialize: () => initialize2
  });
  var translateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>`;
  var dynamicIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-766v572q-17-17-32-36t-28-39v-422q13-20 28-39t32-36Zm160-96v764q-21-7-41-15.5T280-133v-694q19-11 39-19.5t41-15.5Zm280 749v-734q106 47 173 145t67 222q0 124-67 222T640-113ZM480-80q-10 0-20-.5T440-82v-796q10-1 20-1.5t20-.5q20 0 40 2t40 6v784q-20 4-40 6t-40 2Z"/></svg>`;
  var summaryIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
  var elementScanIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M40-480v-80h80v80H40Zm800 0v-80h80v80h-80ZM40-640v-80h80v80H40Zm800 0v-80h80v80h-80ZM40-800v-80h80v80H40Zm160 320v-80h80v80h-80Zm480 0v-80h80v80h-80Zm160-320v-80h80v80h-80Zm-640 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80ZM473-40q-24 0-46-9t-39-26L184-280l33-34q14-14 34-19t40 0l69 20v-327q0-17 11.5-28.5T400-680q17 0 28.5 11.5T440-640v433l-98-28 103 103q6 6 13 9t15 3h167q33 0 56.5-23.5T720-200v-160q0-17 11.5-28.5T760-400q17 0 28.5 11.5T800-360v160q0 66-47 113T640-40H473Zm7-280v-160q0-17 11.5-28.5T520-520q17 0 28.5 11.5T560-480v160h-80Zm120 0v-120q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440v120h-80Zm40 200H445h195Z"/></svg>`;
  function updateScrollbarWidth(container) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    container.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  }
  function createUIContainer() {
    const container = document.createElement("div");
    container.id = "text-extractor-container";
    document.body.appendChild(container);
    updateScrollbarWidth(container);
    window.addEventListener("resize", () => updateScrollbarWidth(container));
    const shadowRoot = container.attachShadow({ mode: "open" });
    return shadowRoot;
  }
  var uiContainer = createUIContainer();
  var currentTooltip = null;
  var hideTimeout = null;
  var MARGIN = 12;
  function removeAllTooltips() {
    uiContainer.querySelectorAll(".text-extractor-tooltip").forEach((tip) => tip.remove());
    currentTooltip = null;
  }
  function checkCollision(rect, obstacles) {
    for (const obstacle of obstacles) {
      if (rect.left < obstacle.right && rect.left + rect.width > obstacle.left && rect.top < obstacle.bottom && rect.top + rect.height > obstacle.top) {
        return true;
      }
    }
    return false;
  }
  function calculateOptimalPosition(targetRect, tooltipRect, obstacles) {
    const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
    const { width: ttWidth, height: ttHeight } = tooltipRect;
    const positions = [
      {
        name: "right",
        top: targetRect.top + targetRect.height / 2 - ttHeight / 2,
        left: targetRect.right + MARGIN
      },
      {
        name: "left",
        top: targetRect.top + targetRect.height / 2 - ttHeight / 2,
        left: targetRect.left - ttWidth - MARGIN
      },
      {
        name: "bottom",
        top: targetRect.bottom + MARGIN,
        left: targetRect.left + targetRect.width / 2 - ttWidth / 2
      },
      {
        name: "top",
        top: targetRect.top - ttHeight - MARGIN,
        left: targetRect.left + targetRect.width / 2 - ttWidth / 2
      }
    ];
    for (const pos of positions) {
      const proposedRect = { top: pos.top, left: pos.left, width: ttWidth, height: ttHeight };
      const isInViewport = proposedRect.top >= 0 && proposedRect.left >= 0 && proposedRect.top + ttHeight <= viewportHeight && proposedRect.left + ttWidth <= viewportWidth;
      if (isInViewport) {
        if (!checkCollision(proposedRect, obstacles)) {
          return { top: pos.top, left: pos.left };
        }
      }
    }
    return { top: positions[0].top, left: positions[0].left };
  }
  function showTooltip(targetElement, text) {
    clearTimeout(hideTimeout);
    removeAllTooltips();
    const tooltip = document.createElement("div");
    tooltip.className = "text-extractor-tooltip";
    tooltip.textContent = text;
    uiContainer.appendChild(tooltip);
    currentTooltip = tooltip;
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const obstacles = Array.from(uiContainer.querySelectorAll(".text-extractor-fab")).filter((el) => el !== targetElement).map((el) => el.getBoundingClientRect());
    const { top, left } = calculateOptimalPosition(targetRect, tooltipRect, obstacles);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
    requestAnimationFrame(() => {
      if (tooltip === currentTooltip) {
        tooltip.classList.add("is-visible");
      }
    });
  }
  function hideTooltip() {
    if (!currentTooltip) return;
    const tooltipToHide = currentTooltip;
    currentTooltip = null;
    tooltipToHide.classList.remove("is-visible");
    hideTimeout = setTimeout(() => {
      tooltipToHide.remove();
    }, 200);
  }
  var themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;
  var languageIcon_default = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>`;
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
  var en_default = {
    common: {
      scan: "Scan",
      stop: "Stop",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      discovered: "Discovered:",
      confirm: "Confirm",
      cancel: "Cancel",
      export: "Export",
      reselect: "Reselect",
      stage: "Stage"
    },
    export: {
      exportAsTxt: "Export as TXT",
      exportAsJson: "Export as JSON",
      exportAsCsv: "Export as CSV",
      csv: {
        id: "ID",
        original: "Original",
        translation: "Translation"
      }
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      filters: {
        numbers: "Filter Numbers/Currency",
        chinese: "Filter Chinese-Only Text",
        contains_chinese: "Filter Text Containing Chinese",
        emoji_only: "Filter Emoji-Only Text",
        symbols: "Filter Symbol-Only Text",
        term: "Filter Specific Terms",
        single_letter: "Filter Single English Letters",
        repeating_chars: "Filter Repeating Characters",
        file_paths: "Filter File Paths",
        hex_color_codes: "Filter Hex Color Codes",
        email_addresses: "Filter Email Addresses",
        uuids: "Filter UUIDs",
        git_commit_hashes: "Filter Git Commit Hashes",
        website_urls: "Filter Website URLs",
        website_urls_title: "Filter Website URLs",
        shorthand_numbers: "Filter Shorthand Numbers",
        shorthand_numbers_title: "Filter Shorthand Numbers"
      },
      display: {
        show_fab: "Show Floating Button",
        fab_position: "Floating Button Position",
        fab_positions: {
          bottom_right: "Bottom Right",
          top_right: "Top Right",
          bottom_left: "Bottom Left",
          top_left: "Top Left"
        },
        show_line_numbers: "Show Line Numbers",
        show_statistics: "Show Statistics",
        enable_word_wrap: "Enable Word Wrap",
        text_truncation_limit: "Enable Text Truncation Limit",
        character_limit: "Character Limit",
        show_scan_count: "Enable Scan Count in Title"
      },
      advanced: {
        enable_debug_logging: "Enable Debug Logging"
      },
      panel: {
        title: "Settings Panel"
      },
      languages: {
        en: "English",
        zh_CN: "\u7B80\u4F53\u4E2D\u6587",
        zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Session Scan",
      stagedCount: "Staged:",
      elementFinished: "Element scan finished, found {{count}} items.",
      startSession: "Start Dynamic Scan Session",
      stopSession: "Stop Dynamic Scan Session",
      finished: "Scan finished, found {{count}} items.",
      quickFinished: "Quick scan finished, found {{count}} items.",
      sessionStarted: "Session scan started.",
      sessionInProgress: "Scan in progress...",
      truncationWarning: "To maintain UI fluency, only a portion of the text is displayed here. The full content will be available upon export."
    },
    results: {
      title: "Extracted Text",
      scanCountSession: "Scanned {{count}} items",
      scanCountStatic: "Total {{count}} items scanned",
      totalCharacters: "Total Characters",
      totalLines: "Total Lines",
      noSummary: "No summary available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy.",
      contentCleared: "Content cleared.",
      noTextSelected: "No text selected.",
      scanFailed: "Scan failed.",
      elementScanStarted: "Element scan started.",
      cspWorkerWarning: "Switched to compatibility scan mode due to website security restrictions."
    },
    placeholders: {
      click: "Click ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " to start a new scan session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " to perform a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone."
    },
    tooltip: {
      summary: "View Summary",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan",
      element_scan: "Element Scan",
      disabled: {
        scan_in_progress: "Another scan is in progress"
      },
      filters: {
        title: "Content Filter Explanation",
        numbers: 'This rule filters out text that consists <strong>entirely</strong> of numbers, spaces, thousand separators (.), decimal points (,), and some currency symbols ($, \u20AC, \xA3, \xA5).<br><br><strong>More Examples:</strong><br>\u2022 "1,234.56"<br>\u2022 "\xA5999"<br>\u2022 "\u20AC200"<br>\u2022 "$ 100"',
        chinese: 'This rule filters out text that consists <strong>entirely</strong> of Chinese characters and spaces, excluding any punctuation.<br><br><strong>Examples:</strong><br>\u2022 "\u4F60\u597D \u4E16\u754C" (will be filtered)<br>\u2022 "\u4F60\u597D\uFF0C\u4E16\u754C" (will not be filtered)',
        contains_chinese: `This rule filters out <strong>any</strong> text that contains at least one Chinese character, regardless of other characters.<br><br><strong>Examples:</strong><br>\u2022 "\u4F60\u597D World" (will be filtered)<br>\u2022 "Chapter 1" (will be filtered, as '\u7B2C 1 \u7AE0' contains '\u7B2C' and '\u7AE0')`,
        emoji_only: 'This rule filters out text that consists <strong>entirely</strong> of one or more emoji characters and spaces.<br><br><strong>Examples:</strong><br>\u2022 "\u{1F44D}"<br>\u2022 "\u{1F60A} \u{1F389} \u{1F680}"',
        symbols: 'This rule filters out text that consists <strong>entirely</strong> of various punctuation and symbols.<br><br><strong>More Examples:</strong><br>\u2022 "@#*&^%"<br>\u2022 "()[]{}"<br>\u2022 "---...---"',
        term: 'This rule filters out common UI terms that typically do not require translation.<br><br><strong>More Examples:</strong><br>\u2022 "OK", "Cancel", "Submit"<br>\u2022 "Login", "Settings", "Help"',
        single_letter: 'This rule filters out text consisting of a <strong>single</strong> English letter, case-insensitive.<br><br><strong>Examples:</strong><br>\u2022 "A" (will be filtered)<br>\u2022 "b" (will be filtered)<br>\u2022 "AB" (will not be filtered)',
        repeating_chars: 'This rule filters out text composed of the <strong>same character</strong> repeating 2 or more times consecutively.<br><br><strong>Examples:</strong><br>\u2022 "aa"<br>\u2022 "======"<br>\u2022 "bbbbb"',
        file_paths: 'This rule attempts to identify and filter out text that resembles an operating system file path and <strong>includes a file extension</strong>. It does not match URLs.<br><br><strong>More Examples:</strong><br>\u2022 "/path/to/file.js"<br>\u2022 "C:\\Users\\Test\\document.docx"<br>\u2022 "./config.json"',
        hex_color_codes: 'This rule filters out standard CSS hexadecimal color codes (3, 4, 6, or 8 digits, the latter including an alpha channel).<br><br><strong>Examples:</strong><br>\u2022 "#FFFFFF"<br>\u2022 "#ff0000"<br>\u2022 "#f0c"<br>\u2022 "#f0c8" (4-digit)<br>\u2022 "#ff000080" (8-digit)',
        email_addresses: 'This rule filters out text that matches the standard format of an email address.<br><br><strong>Examples:</strong><br>\u2022 "example@domain.com"<br>\u2022 "user.name@sub.domain.org"',
        uuids: 'This rule filters out Universally Unique Identifiers (UUIDs).<br><br><strong>Example:</strong><br>\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: 'This rule filters out standard Git commit hashes (long or short).<br><br><strong>Examples:</strong><br>\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\u2022 "a1b2c3d"',
        website_urls: 'This rule filters out text that is a <strong>standalone URL</strong>. It is designed to be strict to avoid accidentally removing text that is not a link.<br><br><strong>More Examples:</strong><br>\u2022 "https://www.example.com"<br>\u2022 "http://test.co.uk"<br>\u2022 "www.google.com"<br>\u2022 "example.org"',
        shorthand_numbers: 'This rule filters out numbers that use <strong>common shorthand suffixes</strong> for thousands (k), millions (m), or billions (b), case-insensitive.<br><br><strong>More Examples:</strong><br>\u2022 "1.2k"<br>\u2022 "15M"<br>\u2022 "2.5b"<br>\u2022 "100K"'
      },
      display: {
        title: "Display Settings Explanation",
        show_fab: "Control whether to display the <strong>Floating Action Button (FAB)</strong> in the bottom-right corner of webpages. This serves as the primary entry point for both static and dynamic text extraction. <br><br>If you disable this button, you can re-enable it via the settings panel in the Tampermonkey extension menu.",
        show_scan_count: "When enabled, the title bar of the results window will show a <strong>real-time count</strong> of the total text items found in the current scan. This is especially useful for monitoring the progress of a long-running <strong>Dynamic Scan</strong>.",
        show_line_numbers: "Displays line numbers to the left of the text area in the results window. This provides a <strong>precise reference point</strong> when you need to discuss or note a specific line of text.",
        show_statistics: "Displays <strong>real-time statistics</strong> about the extracted content in the status bar at the bottom of the results window, including <strong>total lines</strong> and <strong>total characters</strong>. This helps you quickly assess the volume of the content.",
        enable_word_wrap: "Controls how long lines of text are displayed in the results window.<br><br>\u2022 <strong>Enabled:</strong> Long lines will wrap to fit the window's width.<br>\u2022 <strong>Disabled:</strong> Long lines will remain on a single line, causing a horizontal scrollbar to appear.",
        text_truncation_limit: "This is a <strong>performance-saving</strong> feature. If the script extracts an <strong>extremely long single line of text</strong> (e.g., a base64 encoded image), it could cause the browser to <strong>lag or become unresponsive</strong>.<br><br>This setting truncates any single line exceeding the specified length to ensure the UI remains smooth. <strong>Note: This only affects the display; the exported file will still contain the full, untruncated content.</strong>"
      },
      advanced: {
        title: "Advanced Settings Explanation",
        enable_debug_logging: "When enabled, the script will output detailed internal status, execution steps, and error messages to the browser's <strong>Developer Tools Console</strong> (usually opened with F12). This is primarily for developers or users who need to submit detailed bug reports."
      }
    },
    log: {
      prefix: "[Text Extractor Script-Debug]",
      language: {
        switched: "Language switched to: {{lang}}",
        notFound: "Language '{{lang}}' not found, falling back to 'en'."
      },
      settings: {
        changed: "Setting '{{key}}' changed from '{{oldValue}}' to '{{newValue}}'",
        filterRuleChanged: {
          enabled: "Filter rule '{{key}}' has been enabled",
          disabled: "Filter rule '{{key}}' has been disabled"
        },
        panel: {
          opening: "Opening settings panel...",
          closing: "Closing settings panel...",
          saving: "Saving settings..."
        },
        parseError: "Error parsing saved settings:",
        invalidObject: "Attempted to save an invalid object for settings:"
      },
      textProcessor: {
        filtered: 'Text filtered: "{{text}}" (Reason: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[Quick Scan] Switching to main thread fallback.",
        fallbackFailed: "[Quick Scan] Main thread fallback failed: {{error}}",
        fallback: {
          starting: "[Quick Scan - Fallback] Starting processing in main thread...",
          completed: "[Quick Scan - Fallback] Processing complete, found {{count}} unique texts."
        },
        worker: {
          logPrefix: "[Quick Scan Worker]",
          starting: "[Quick Scan] Starting execution, attempting to use Web Worker...",
          completed: "[Quick Scan] Worker processing successful, received {{count}} texts.",
          scanComplete: "[Quick Scan Worker] Processing complete, found {{count}} unique texts. Sending back to main thread...",
          initFailed: "[Quick Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Quick Scan] Original error: {{error}}",
          sendingData: "[Quick Scan] Web Worker created, sending {{count}} texts for processing...",
          initSyncError: "[Quick Scan] Synchronous error during Worker initialization: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[Session Scan] Switching to main thread fallback.",
        domObserver: {
          stopped: "[Session Scan] Stopped listening for DOM changes."
        },
        fallback: {
          initialized: "[Session Scan - Fallback] Initialized.",
          cleared: "[Session Scan - Fallback] Data cleared."
        },
        worker: {
          logPrefix: "[Session Scan Worker]",
          starting: "Session Scan: Attempting to start Web Worker...",
          initFailed: "[Session Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Session Scan] Original error: {{error}}",
          initialized: "[Session Scan] Worker initialized successfully, sent {{count}} initial texts to start the session.",
          initSyncError: "[Session Scan] Synchronous error during Worker initialization: {{error}}",
          clearCommandSent: "[Session Scan] Clear command sent to worker."
        }
      },
      ui: {
        copyButton: {
          copied: "Copy button clicked, copied {{count}} characters.",
          nothingToCopy: "Copy button clicked, but there was no content to copy or the button was disabled."
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "User confirmed clearing session scan texts, invoking callback..."
          },
          quickScan: {
            confirmed: "User confirmed clearing quick scan texts."
          },
          cancelled: "User cancelled the clear operation."
        },
        modal: {
          opening: "Opening main modal...",
          closing: "Closing main modal...",
          scanFailed: "Static scan failed: {{error}}",
          clearContent: "Clear content button clicked."
        }
      },
      exporter: {
        buttonClicked: "Export button clicked, format: {{format}}.",
        csvError: "Error while parsing text and generating CSV: {{error}}",
        fileExported: "File exported: {{filename}}",
        noContent: "No content to export.",
        unknownFormat: "Unknown export format: {{format}}"
      },
      main: {
        requestingSessionScanData: "Requesting full data from session-scan mode...",
        exportingQuickScanData: "Exporting full data from quick-scan mode's memory...",
        inIframe: "Script is in an iframe, skipping initialization.",
        initializing: "Script initialization started...",
        initialSettingsLoaded: "Initial settings loaded:"
      },
      dom: {
        ttpCreationError: "Failed to create Trusted Type policy:",
        svgParseError: "Invalid or failed to parse SVG string:"
      },
      elementScan: {
        starting: "Element Scan started.",
        stopping: "Element Scan stopped.",
        listenersAdded: "Global event listeners for element scan added.",
        listenersRemoved: "Global event listeners for element scan removed.",
        stateReset: "Element scan state has been reset.",
        reselecting: "Returning to element reselection mode.",
        hovering: "Hovering over <{{tagName}}>.",
        escapePressed: "Escape key pressed, stopping element scan.",
        clickedEnteringAdjust: "Element <{{tagName}}> clicked, entering adjustment mode.",
        pathBuilt: "Element path built, depth: {{depth}}.",
        adjustingLevel: "Adjusting selection level to {{level}} ({{tagName}}).",
        confirmExtracting: "Selection confirmed, extracting text from <{{tagName}}>.",
        staged: "Element staged. Total staged: {{count}}.",
        confirmingStaged: "Confirming selection. Processing {{count}} staged elements.",
        extractedCount: "Extracted {{count}} raw text fragments from element.",
        confirmFailedNoTarget: "Confirmation failed: no target element selected.",
        rightClickExit: "Right-click detected, stopping element scan.",
        processingError: "An error occurred during text processing: {{error}}",
        scrollListenersAdded: "Added {{count}} scroll listeners to parent elements.",
        scrollListenersRemoved: "Removed all scroll listeners.",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "Element Scan Worker is starting...",
          sendingData: "Sending {{count}} text fragments to Element Scan Worker.",
          completed: "Element Scan Worker completed, found {{count}} unique texts.",
          initFailed: "Element Scan Worker initialization failed. The browser's CSP might be blocking data: URLs.",
          initSyncError: "Synchronous error during Element Scan Worker initialization: {{error}}",
          originalError: "Original worker error: {{error}}"
        },
        switchToFallback: "Switching to main thread fallback for Element Scan.",
        fallbackFailed: "Element Scan fallback mode failed: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "Element Scan UI: Creating highlight elements for the first time.",
        updatingHighlight: "Element Scan UI: Updating highlight for <{{tagName}}>.",
        creatingToolbar: "Element Scan UI: Creating adjustment toolbar.",
        toolbarPositioned: "Element Scan UI: Toolbar positioned.",
        sliderChanged: "Element Scan UI: Slider changed to level {{level}}",
        reselectClicked: "Element Scan UI: 'Reselect' button clicked.",
        stageClicked: "Element Scan UI: 'Stage' button clicked.",
        cancelClicked: "Element Scan UI: 'Cancel' button clicked.",
        confirmClicked: "Element Scan UI: 'Confirm' button clicked.",
        dragStarted: "Element Scan UI: Drag started.",
        dragEnded: "Element Scan UI: Drag ended.",
        cleaningHighlights: "Element Scan UI: Cleaning up highlight elements.",
        cleaningToolbar: "Element Scan UI: Cleaning up toolbar."
      },
      eventBus: {
        callbackError: "Error in callback for event '{{eventName}}':"
      },
      trustedTypes: {
        workerPolicyError: "Failed to create Trusted Types worker policy:",
        htmlPolicyError: "Failed to create Trusted Types HTML policy:",
        defaultWorkerPolicyWarning: "Trusted Types default policy failed for worker URL, falling back to raw URL.",
        defaultHtmlPolicyWarning: "Trusted Types default policy failed for HTML, falling back to raw string."
      }
    },
    tutorial: {
      elementScanTitle: "Element Scan Guide",
      elementScan: '<p class="tutorial-content">This is a placeholder for the element scan tutorial. Rich text is supported.</p>'
    }
  };
  var zh_CN_default = {
    common: {
      scan: "\u626B\u63CF",
      stop: "\u505C\u6B62",
      resume: "\u6062\u590D",
      clear: "\u6E05\u7A7A",
      copy: "\u590D\u5236",
      save: "\u4FDD\u5B58",
      discovered: "\u5DF2\u53D1\u73B0:",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      export: "\u5BFC\u51FA",
      reselect: "\u91CD\u65B0\u9009\u62E9",
      stage: "\u6682\u5B58"
    },
    export: {
      exportAsTxt: "\u5BFC\u51FA\u4E3A TXT",
      exportAsJson: "\u5BFC\u51FA\u4E3A JSON",
      exportAsCsv: "\u5BFC\u51FA\u4E3A CSV",
      csv: {
        id: "ID",
        original: "\u539F\u6587",
        translation: "\u8BD1\u6587"
      }
    },
    settings: {
      title: "\u8BBE\u7F6E",
      theme: "\u4E3B\u9898",
      language: "\u8BED\u8A00",
      relatedSettings: "\u76F8\u5173\u8BBE\u7F6E",
      filterRules: "\u5185\u5BB9\u8FC7\u6EE4\u89C4\u5219",
      filters: {
        numbers: "\u8FC7\u6EE4\u6570\u5B57/\u8D27\u5E01",
        chinese: "\u8FC7\u6EE4\u7EAF\u4E2D\u6587\u6587\u672C",
        contains_chinese: "\u8FC7\u6EE4\u542B\u4E2D\u6587\u7684\u6587\u672C",
        emoji_only: "\u8FC7\u6EE4\u7EAF\u8868\u60C5\u7B26\u53F7\u6587\u672C",
        symbols: "\u8FC7\u6EE4\u7EAF\u7B26\u53F7\u6587\u672C",
        term: "\u8FC7\u6EE4\u7279\u5B9A\u672F\u8BED",
        single_letter: "\u8FC7\u6EE4\u5355\u4E2A\u82F1\u6587\u5B57\u6BCD",
        repeating_chars: "\u8FC7\u6EE4\u91CD\u590D\u5B57\u7B26",
        file_paths: "\u8FC7\u6EE4\u6587\u4EF6\u8DEF\u5F84",
        hex_color_codes: "\u8FC7\u6EE4\u5341\u516D\u8FDB\u5236\u989C\u8272\u4EE3\u7801",
        email_addresses: "\u8FC7\u6EE4\u7535\u5B50\u90AE\u4EF6\u5730\u5740",
        uuids: "\u8FC7\u6EE4 UUID",
        git_commit_hashes: "\u8FC7\u6EE4 Git \u63D0\u4EA4\u54C8\u5E0C\u503C",
        website_urls: "\u8FC7\u6EE4\u7F51\u7AD9\u94FE\u63A5",
        website_urls_title: "\u8FC7\u6EE4\u7F51\u7AD9\u94FE\u63A5",
        shorthand_numbers: "\u8FC7\u6EE4\u901F\u8BB0\u6570\u5B57",
        shorthand_numbers_title: "\u8FC7\u6EE4\u901F\u8BB0\u6570\u5B57"
      },
      display: {
        show_fab: "\u663E\u793A\u60AC\u6D6E\u6309\u94AE",
        fab_position: "\u60AC\u6D6E\u6309\u94AE\u4F4D\u7F6E",
        fab_positions: {
          bottom_right: "\u53F3\u4E0B\u89D2",
          top_right: "\u53F3\u4E0A\u89D2",
          bottom_left: "\u5DE6\u4E0B\u89D2",
          top_left: "\u5DE6\u4E0A\u89D2"
        },
        show_line_numbers: "\u663E\u793A\u884C\u53F7",
        show_statistics: "\u663E\u793A\u7EDF\u8BA1\u4FE1\u606F",
        enable_word_wrap: "\u542F\u7528\u81EA\u52A8\u6362\u884C",
        text_truncation_limit: "\u542F\u7528\u6587\u672C\u622A\u65AD\u9650\u5236",
        character_limit: "\u5B57\u7B26\u9650\u5236",
        show_scan_count: "\u5728\u6807\u9898\u4E2D\u542F\u7528\u626B\u63CF\u8BA1\u6570"
      },
      advanced: {
        enable_debug_logging: "\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7\u8BB0\u5F55"
      },
      panel: {
        title: "\u8BBE\u7F6E\u9762\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\u7B80\u4F53\u4E2D\u6587",
        zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "\u6D45\u8272",
        dark: "\u6DF1\u8272",
        system: "\u8DDF\u968F\u7CFB\u7EDF"
      }
    },
    scan: {
      quick: "\u5FEB\u901F\u626B\u63CF",
      session: "\u4F1A\u8BDD\u626B\u63CF",
      stagedCount: "\u5DF2\u6682\u5B58:",
      elementFinished: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {{count}} \u6761\u6587\u672C\u3002",
      startSession: "\u5F00\u59CB\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      stopSession: "\u505C\u6B62\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      finished: "\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {{count}} \u6761\u6587\u672C\u3002",
      quickFinished: "\u5FEB\u901F\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 {{count}} \u6761\u6587\u672C\u3002",
      sessionStarted: "\u4F1A\u8BDD\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
      sessionInProgress: "\u626B\u63CF\u8FDB\u884C\u4E2D...",
      truncationWarning: "\u4E3A\u4FDD\u6301\u754C\u9762\u6D41\u7545\uFF0C\u6B64\u5904\u4EC5\u663E\u793A\u90E8\u5206\u6587\u672C\u3002\u5BFC\u51FA\u540E\u5C06\u5305\u542B\u5B8C\u6574\u5185\u5BB9\u3002"
    },
    results: {
      title: "\u63D0\u53D6\u7684\u6587\u672C",
      scanCountSession: "\u5DF2\u626B\u63CF {{count}} \u4E2A\u9879\u76EE",
      scanCountStatic: "\u5171\u626B\u63CF {{count}} \u4E2A\u9879\u76EE",
      totalCharacters: "\u603B\u5B57\u7B26\u6570",
      totalLines: "\u603B\u884C\u6570",
      noSummary: "\u65E0\u53EF\u7528\u6458\u8981",
      stats: {
        lines: "\u884C",
        chars: "\u5B57\u7B26"
      }
    },
    notifications: {
      copiedToClipboard: "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F\uFF01",
      settingsSaved: "\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF01",
      modalInitError: "\u6A21\u6001\u6846\u672A\u521D\u59CB\u5316\u3002",
      nothingToCopy: "\u6CA1\u6709\u53EF\u590D\u5236\u7684\u5185\u5BB9\u3002",
      contentCleared: "\u5185\u5BB9\u5DF2\u6E05\u9664\u3002",
      noTextSelected: "\u672A\u9009\u62E9\u4EFB\u4F55\u6587\u672C\u3002",
      scanFailed: "\u626B\u63CF\u5931\u8D25\u3002",
      elementScanStarted: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
      cspWorkerWarning: "\u56E0\u7F51\u7AD9\u5B89\u5168\u9650\u5236\uFF0C\u5DF2\u5207\u6362\u81F3\u517C\u5BB9\u626B\u63CF\u6A21\u5F0F\u3002"
    },
    placeholders: {
      click: "\u70B9\u51FB ",
      dynamicScan: "[\u52A8\u6001\u626B\u63CF]",
      startNewScanSession: " \u5F00\u59CB\u65B0\u7684\u626B\u63CF\u4F1A\u8BDD",
      staticScan: "[\u9759\u6001\u626B\u63CF]",
      performOneTimeScan: " \u6267\u884C\u4E00\u6B21\u6027\u5FEB\u901F\u63D0\u53D6"
    },
    confirmation: {
      clear: "\u60A8\u786E\u5B9A\u8981\u6E05\u9664\u5185\u5BB9\u5417\uFF1F\u6B64\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002"
    },
    tooltip: {
      summary: "\u67E5\u770B\u6458\u8981",
      dynamic_scan: "\u52A8\u6001\u626B\u63CF",
      static_scan: "\u9759\u6001\u626B\u63CF",
      element_scan: "\u9009\u53D6\u5143\u7D20\u626B\u63CF",
      disabled: {
        scan_in_progress: "\u53E6\u4E00\u9879\u626B\u63CF\u6B63\u5728\u8FDB\u884C\u4E2D"
      },
      filters: {
        title: "\u5185\u5BB9\u8FC7\u6EE4\u5668\u8BF4\u660E",
        numbers: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u6570\u5B57\u3001\u7A7A\u683C\u3001\u5343\u4F4D\u5206\u9694\u7B26(,)\u3001\u5C0F\u6570\u70B9(.)\u4EE5\u53CA\u90E8\u5206\u8D27\u5E01\u7B26\u53F7($, \u20AC, \xA3, \xA5)\u7EC4\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "1,234.56"<br>\u2022 "\xA5999"<br>\u2022 "\u20AC200"<br>\u2022 "$ 100"',
        chinese: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u6C49\u5B57\u548C\u7A7A\u683C\u7EC4\u6210\uFF0C\u4E14\u4E0D\u542B\u4EFB\u4F55\u6807\u70B9\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "\u4F60\u597D \u4E16\u754C" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "\u4F60\u597D\uFF0C\u4E16\u754C" (\u4E0D\u4F1A\u88AB\u8FC7\u6EE4)',
        contains_chinese: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u4EFB\u4F55\u542B\u6709\u81F3\u5C11\u4E00\u4E2A\u6C49\u5B57\u7684\u6587\u672C\uFF0C\u65E0\u8BBA\u5176\u4ED6\u5B57\u7B26\u662F\u4EC0\u4E48\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "\u4F60\u597D World" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "\u7B2C\u4E00\u7AE0" (\u5C06\u88AB\u8FC7\u6EE4)',
        emoji_only: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u4E00\u4E2A\u6216\u591A\u4E2A\u8868\u60C5\u7B26\u53F7\u53CA\u7A7A\u683C\u7EC4\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "\u{1F44D}"<br>\u2022 "\u{1F60A} \u{1F389} \u{1F680}"',
        symbols: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u5B8C\u5168</strong>\u7531\u5404\u79CD\u6807\u70B9\u548C\u7B26\u53F7\u7EC4\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "@#*&^%"<br>\u2022 "()[]{}"<br>\u2022 "---...---"',
        term: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u901A\u5E38\u4E0D\u9700\u8981\u7FFB\u8BD1\u7684\u5E38\u89C1UI\u672F\u8BED\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "OK", "Cancel", "Submit"<br>\u2022 "Login", "Settings", "Help"',
        single_letter: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u7531<strong>\u5355\u4E2A</strong>\u82F1\u6587\u5B57\u6BCD\u7EC4\u6210\u7684\u6587\u672C\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "A" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "b" (\u5C06\u88AB\u8FC7\u6EE4)<br>\u2022 "AB" (\u4E0D\u4F1A\u88AB\u8FC7\u6EE4)',
        repeating_chars: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u7531<strong>\u540C\u4E00\u4E2A\u5B57\u7B26</strong>\u8FDE\u7EED\u91CD\u590D2\u6B21\u6216\u4EE5\u4E0A\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "aa"<br>\u2022 "======"<br>\u2022 "bbbbb"',
        file_paths: '\u6B64\u89C4\u5219\u5C1D\u8BD5\u8BC6\u522B\u5E76\u8FC7\u6EE4\u6389\u7C7B\u4F3C\u64CD\u4F5C\u7CFB\u7EDF\u6587\u4EF6\u8DEF\u5F84\u4E14<strong>\u5305\u542B\u6587\u4EF6\u6269\u5C55\u540D</strong>\u7684\u6587\u672C\u3002\u5B83\u4E0D\u5339\u914D\u7F51\u5740\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "/path/to/file.js"<br>\u2022 "C:\\Users\\Test\\document.docx"<br>\u2022 "./config.json"',
        hex_color_codes: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u6807\u51C6\u7684CSS\u5341\u516D\u8FDB\u5236\u989C\u8272\u4EE3\u7801\uFF083\u30014\u30016\u62168\u4F4D\uFF0C\u540E\u8005\u5305\u542B\u900F\u660E\u5EA6\u901A\u9053\uFF09\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "#FFFFFF"<br>\u2022 "#ff0000"<br>\u2022 "#f0c"<br>\u2022 "#f0c8" (4\u4F4D)<br>\u2022 "#ff000080" (8\u4F4D)',
        email_addresses: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u7B26\u5408\u6807\u51C6\u7535\u5B50\u90AE\u4EF6\u5730\u5740\u683C\u5F0F\u7684\u6587\u672C\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "example@domain.com"<br>\u2022 "user.name@sub.domain.org"',
        uuids: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u901A\u7528\u552F\u4E00\u6807\u8BC6\u7B26 (UUID)\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u6807\u51C6\u7684Git\u63D0\u4EA4\u54C8\u5E0C\u503C\uFF08\u957F\u6216\u77ED\uFF09\u3002<br><br><strong>\u793A\u4F8B:</strong><br>\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\u2022 "a1b2c3d"',
        website_urls: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389<strong>\u72EC\u7ACB\u7684\u7F51\u5740</strong>\u3002\u5B83\u8BBE\u8BA1\u5F97\u6BD4\u8F83\u4E25\u683C\uFF0C\u4EE5\u907F\u514D\u610F\u5916\u79FB\u9664\u4E0D\u662F\u94FE\u63A5\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "https://www.example.com"<br>\u2022 "http://test.co.uk"<br>\u2022 "www.google.com"<br>\u2022 "example.org"',
        shorthand_numbers: '\u6B64\u89C4\u5219\u8FC7\u6EE4\u6389\u4F7F\u7528<strong>\u5E38\u89C1\u901F\u8BB0\u540E\u7F00</strong>\u8868\u793A\u5343(k)\u3001\u767E\u4E07(m)\u6216\u5341\u4EBF(b)\u7684\u6570\u5B57\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002<br><br><strong>\u66F4\u591A\u793A\u4F8B:</strong><br>\u2022 "1.2k"<br>\u2022 "15M"<br>\u2022 "2.5b"<br>\u2022 "100K"'
      },
      display: {
        title: "\u663E\u793A\u8BBE\u7F6E\u8BF4\u660E",
        show_fab: "\u63A7\u5236\u662F\u5426\u5728\u7F51\u9875\u53F3\u4E0B\u89D2\u663E\u793A<strong>\u60AC\u6D6E\u64CD\u4F5C\u6309\u94AE(FAB)</strong>\u3002\u8FD9\u662F\u8FDB\u884C\u9759\u6001\u548C\u52A8\u6001\u6587\u672C\u63D0\u53D6\u7684\u4E3B\u8981\u5165\u53E3\u3002<br><br>\u5982\u679C\u60A8\u7981\u7528\u4E86\u6B64\u6309\u94AE\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6CB9\u7334\u6269\u5C55\u83DC\u5355\u4E2D\u7684\u8BBE\u7F6E\u9762\u677F\u91CD\u65B0\u542F\u7528\u5B83\u3002",
        show_scan_count: "\u542F\u7528\u540E\uFF0C\u7ED3\u679C\u7A97\u53E3\u7684\u6807\u9898\u680F\u5C06<strong>\u5B9E\u65F6\u663E\u793A</strong>\u5F53\u524D\u626B\u63CF\u4E2D\u627E\u5230\u7684\u603B\u6587\u672C\u9879\u76EE\u6570\u3002\u8FD9\u5BF9\u4E8E\u76D1\u63A7\u957F\u65F6\u95F4\u8FD0\u884C\u7684<strong>\u52A8\u6001\u626B\u63CF</strong>\u7684\u8FDB\u5EA6\u7279\u522B\u6709\u7528\u3002",
        show_line_numbers: "\u5728\u7ED3\u679C\u7A97\u53E3\u7684\u6587\u672C\u533A\u57DF\u5DE6\u4FA7\u663E\u793A\u884C\u53F7\u3002\u5F53\u60A8\u9700\u8981\u8BA8\u8BBA\u6216\u8BB0\u5F55\u7279\u5B9A\u6587\u672C\u884C\u65F6\uFF0C\u8FD9\u63D0\u4F9B\u4E86\u4E00\u4E2A<strong>\u7CBE\u786E\u7684\u53C2\u8003\u70B9</strong>\u3002",
        show_statistics: "\u5728\u7ED3\u679C\u7A97\u53E3\u5E95\u90E8\u7684\u72B6\u6001\u680F\u4E2D\u663E\u793A\u6709\u5173\u63D0\u53D6\u5185\u5BB9\u7684<strong>\u5B9E\u65F6\u7EDF\u8BA1\u6570\u636E</strong>\uFF0C\u5305\u62EC<strong>\u603B\u884C\u6570</strong>\u548C<strong>\u603B\u5B57\u7B26\u6570</strong>\u3002\u8FD9\u6709\u52A9\u4E8E\u60A8\u5FEB\u901F\u8BC4\u4F30\u5185\u5BB9\u7684\u4F53\u91CF\u3002",
        enable_word_wrap: "\u63A7\u5236\u7ED3\u679C\u7A97\u53E3\u4E2D\u957F\u6587\u672C\u884C\u7684\u663E\u793A\u65B9\u5F0F\u3002<br><br>\u2022 <strong>\u542F\u7528:</strong> \u957F\u884C\u5C06\u81EA\u52A8\u6362\u884C\u4EE5\u9002\u5E94\u7A97\u53E3\u5BBD\u5EA6\u3002<br>\u2022 <strong>\u7981\u7528:</strong> \u957F\u884C\u5C06\u4FDD\u6301\u5728\u5355\u884C\uFF0C\u5E76\u51FA\u73B0\u6C34\u5E73\u6EDA\u52A8\u6761\u3002",
        text_truncation_limit: "\u8FD9\u662F\u4E00\u4E2A<strong>\u6027\u80FD\u4F18\u5316</strong>\u529F\u80FD\u3002\u5982\u679C\u811A\u672C\u63D0\u53D6\u5230<strong>\u6781\u957F\u7684\u5355\u884C\u6587\u672C</strong>\uFF08\u4F8B\u5982\uFF0Cbase64\u7F16\u7801\u7684\u56FE\u7247\uFF09\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u6D4F\u89C8\u5668<strong>\u5361\u987F\u6216\u65E0\u54CD\u5E94</strong>\u3002<br><br>\u6B64\u8BBE\u7F6E\u4F1A\u622A\u65AD\u4EFB\u4F55\u8D85\u8FC7\u6307\u5B9A\u957F\u5EA6\u7684\u5355\u884C\u6587\u672C\uFF0C\u4EE5\u786E\u4FDDUI\u4FDD\u6301\u6D41\u7545\u3002<strong>\u6CE8\u610F\uFF1A\u8FD9\u4EC5\u5F71\u54CD\u663E\u793A\uFF1B\u5BFC\u51FA\u7684\u6587\u4EF6\u4ECD\u5C06\u5305\u542B\u5B8C\u6574\u7684\u3001\u672A\u622A\u65AD\u7684\u5185\u5BB9\u3002</strong>"
      },
      advanced: {
        title: "\u9AD8\u7EA7\u8BBE\u7F6E\u8BF4\u660E",
        enable_debug_logging: "\u542F\u7528\u540E\uFF0C\u811A\u672C\u4F1A\u5C06\u8BE6\u7EC6\u7684\u5185\u90E8\u72B6\u6001\u3001\u6267\u884C\u6B65\u9AA4\u548C\u9519\u8BEF\u4FE1\u606F\u8F93\u51FA\u5230\u6D4F\u89C8\u5668\u7684<strong>\u5F00\u53D1\u8005\u5DE5\u5177\u63A7\u5236\u53F0</strong>\uFF08\u901A\u5E38\u7528F12\u6253\u5F00\uFF09\u3002\u8FD9\u4E3B\u8981\u4F9B\u5F00\u53D1\u8005\u6216\u9700\u8981\u63D0\u4EA4\u8BE6\u7EC6\u9519\u8BEF\u62A5\u544A\u7684\u7528\u6237\u4F7F\u7528\u3002"
      }
    },
    log: {
      prefix: "[\u6587\u672C\u63D0\u53D6\u811A\u672C-\u8C03\u8BD5]",
      language: {
        switched: "\u8BED\u8A00\u5DF2\u5207\u6362\u81F3\uFF1A{{lang}}",
        notFound: "\u672A\u627E\u5230\u8BED\u8A00 '{{lang}}'\uFF0C\u5DF2\u56DE\u9000\u81F3 'en'\u3002"
      },
      settings: {
        changed: "\u8BBE\u7F6E '{{key}}' \u5DF2\u4ECE '{{oldValue}}' \u66F4\u6539\u4E3A '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\u8FC7\u6EE4\u89C4\u5219 '{{key}}' \u5DF2\u542F\u7528",
          disabled: "\u8FC7\u6EE4\u89C4\u5219 '{{key}}' \u5DF2\u7981\u7528"
        },
        panel: {
          opening: "\u6B63\u5728\u6253\u5F00\u8BBE\u7F6E\u9762\u677F...",
          closing: "\u6B63\u5728\u5173\u95ED\u8BBE\u7F6E\u9762\u677F...",
          saving: "\u6B63\u5728\u4FDD\u5B58\u8BBE\u7F6E..."
        },
        parseError: "\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u8BBE\u7F6E\u65F6\u51FA\u9519\uFF1A",
        invalidObject: "\u8BD5\u56FE\u4E3A\u8BBE\u7F6E\u4FDD\u5B58\u4E00\u4E2A\u65E0\u6548\u5BF9\u8C61\uFF1A"
      },
      textProcessor: {
        filtered: '\u6587\u672C\u5DF2\u8FC7\u6EE4: "{{text}}" (\u539F\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\u5FEB\u901F\u626B\u63CF] \u6B63\u5728\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u3002",
        fallbackFailed: "[\u5FEB\u901F\u626B\u63CF] \u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u6267\u884C\u5931\u8D25: {{error}}",
        fallback: {
          starting: "[\u5FEB\u901F\u626B\u63CF - \u5907\u9009] \u6B63\u5728\u4E3B\u7EBF\u7A0B\u4E2D\u5F00\u59CB\u5904\u7406...",
          completed: "[\u5FEB\u901F\u626B\u63CF - \u5907\u9009] \u5904\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u6761\u4E0D\u91CD\u590D\u6587\u672C\u3002"
        },
        worker: {
          logPrefix: "[\u5FEB\u901F\u626B\u63CF Worker]",
          starting: "[\u5FEB\u901F\u626B\u63CF] \u5F00\u59CB\u6267\u884C\uFF0C\u5C1D\u8BD5\u4F7F\u7528 Web Worker...",
          completed: "[\u5FEB\u901F\u626B\u63CF] Worker \u5904\u7406\u6210\u529F\uFF0C\u6536\u5230 {{count}} \u6761\u6587\u672C\u3002",
          scanComplete: "[\u5FEB\u901F\u626B\u63CF Worker] \u5904\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u6761\u4E0D\u91CD\u590D\u6587\u672C\u3002\u6B63\u5728\u53D1\u56DE\u4E3B\u7EBF\u7A0B...",
          initFailed: "[\u5FEB\u901F\u626B\u63CF] Worker \u521D\u59CB\u5316\u5931\u8D25\u3002\u8FD9\u5F88\u53EF\u80FD\u662F\u7531\u4E8E\u7F51\u7AD9\u7684\u5185\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5BFC\u81F4\u7684\u3002",
          originalError: "[\u5FEB\u901F\u626B\u63CF] \u539F\u59CB\u9519\u8BEF: {{error}}",
          sendingData: "[\u5FEB\u901F\u626B\u63CF] Web Worker \u5DF2\u521B\u5EFA\uFF0C\u6B63\u5728\u53D1\u9001 {{count}} \u6761\u6587\u672C\u8FDB\u884C\u5904\u7406...",
          initSyncError: "[\u5FEB\u901F\u626B\u63CF] Worker \u521D\u59CB\u5316\u671F\u95F4\u53D1\u751F\u540C\u6B65\u9519\u8BEF: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\u4F1A\u8BDD\u626B\u63CF] \u6B63\u5728\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u3002",
        domObserver: {
          stopped: "[\u4F1A\u8BDD\u626B\u63CF] \u5DF2\u505C\u6B62\u76D1\u542C DOM \u53D8\u5316\u3002"
        },
        fallback: {
          initialized: "[\u4F1A\u8BDD\u626B\u63CF - \u5907\u9009] \u5DF2\u521D\u59CB\u5316\u3002",
          cleared: "[\u4F1A\u8BDD\u626B\u63CF - \u5907\u9009] \u6570\u636E\u5DF2\u6E05\u9664\u3002"
        },
        worker: {
          logPrefix: "[\u4F1A\u8BDD\u626B\u63CF Worker]",
          starting: "\u4F1A\u8BDD\u626B\u63CF\uFF1A\u6B63\u5728\u5C1D\u8BD5\u542F\u52A8 Web Worker...",
          initFailed: "[\u4F1A\u8BDD\u626B\u63CF] Worker \u521D\u59CB\u5316\u5931\u8D25\u3002\u8FD9\u5F88\u53EF\u80FD\u662F\u7531\u4E8E\u7F51\u7AD9\u7684\u5185\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5BFC\u81F4\u7684\u3002",
          originalError: "[\u4F1A\u8BDD\u626B\u63CF] \u539F\u59CB\u9519\u8BEF: {{error}}",
          initialized: "[\u4F1A\u8BDD\u626B\u63CF] Worker \u521D\u59CB\u5316\u6210\u529F\uFF0C\u5DF2\u53D1\u9001 {{count}} \u6761\u521D\u59CB\u6587\u672C\u4EE5\u5F00\u59CB\u4F1A\u8BDD\u3002",
          initSyncError: "[\u4F1A\u8BDD\u626B\u63CF] Worker \u521D\u59CB\u5316\u671F\u95F4\u53D1\u751F\u540C\u6B65\u9519\u8BEF: {{error}}",
          clearCommandSent: "[\u4F1A\u8BDD\u626B\u63CF] \u6E05\u9664\u547D\u4EE4\u5DF2\u53D1\u9001\u81F3 worker\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\u590D\u5236\u6309\u94AE\u5DF2\u70B9\u51FB\uFF0C\u590D\u5236\u4E86 {{count}} \u4E2A\u5B57\u7B26\u3002",
          nothingToCopy: "\u590D\u5236\u6309\u94AE\u5DF2\u70B9\u51FB\uFF0C\u4F46\u6CA1\u6709\u5185\u5BB9\u53EF\u590D\u5236\u6216\u6309\u94AE\u88AB\u7981\u7528\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\u7528\u6237\u5DF2\u786E\u8BA4\u6E05\u9664\u4F1A\u8BDD\u626B\u63CF\u6587\u672C\uFF0C\u6B63\u5728\u8C03\u7528\u56DE\u8C03..."
          },
          quickScan: {
            confirmed: "\u7528\u6237\u5DF2\u786E\u8BA4\u6E05\u9664\u5FEB\u901F\u626B\u63CF\u6587\u672C\u3002"
          },
          cancelled: "\u7528\u6237\u5DF2\u53D6\u6D88\u6E05\u9664\u64CD\u4F5C\u3002"
        },
        modal: {
          opening: "\u6B63\u5728\u6253\u5F00\u4E3B\u6A21\u6001\u6846...",
          closing: "\u6B63\u5728\u5173\u95ED\u4E3B\u6A21\u6001\u6846...",
          scanFailed: "\u9759\u6001\u626B\u63CF\u5931\u8D25: {{error}}",
          clearContent: "\u6E05\u7A7A\u5185\u5BB9\u6309\u94AE\u5DF2\u70B9\u51FB\u3002"
        }
      },
      exporter: {
        buttonClicked: "\u5BFC\u51FA\u6309\u94AE\u5DF2\u70B9\u51FB\uFF0C\u683C\u5F0F: {{format}}\u3002",
        csvError: "\u89E3\u6790\u6587\u672C\u5E76\u751F\u6210CSV\u65F6\u51FA\u9519: {{error}}",
        fileExported: "\u6587\u4EF6\u5DF2\u5BFC\u51FA: {{filename}}",
        noContent: "\u65E0\u5185\u5BB9\u53EF\u5BFC\u51FA\u3002",
        unknownFormat: "\u672A\u77E5\u7684\u5BFC\u51FA\u683C\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\u6B63\u5728\u8BF7\u6C42\u4F1A\u8BDD\u626B\u63CF\u6A21\u5F0F\u7684\u5B8C\u6574\u6570\u636E...",
        exportingQuickScanData: "\u6B63\u5728\u5BFC\u51FA\u5FEB\u901F\u626B\u63CF\u6A21\u5F0F\u5185\u5B58\u4E2D\u7684\u5B8C\u6574\u6570\u636E...",
        inIframe: "\u811A\u672C\u5728 iframe \u4E2D\uFF0C\u5DF2\u8DF3\u8FC7\u521D\u59CB\u5316\u3002",
        initializing: "\u811A\u672C\u521D\u59CB\u5316\u5F00\u59CB...",
        initialSettingsLoaded: "\u521D\u59CB\u8BBE\u7F6E\u5DF2\u52A0\u8F7D:"
      },
      dom: {
        ttpCreationError: "\u521B\u5EFA Trusted Type \u7B56\u7565\u5931\u8D25:",
        svgParseError: "SVG \u5B57\u7B26\u4E32\u65E0\u6548\u6216\u89E3\u6790\u5931\u8D25:"
      },
      elementScan: {
        starting: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u5F00\u59CB\u3002",
        stopping: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5DF2\u505C\u6B62\u3002",
        listenersAdded: "\u5DF2\u4E3A\u9009\u53D6\u5143\u7D20\u626B\u63CF\u6DFB\u52A0\u5168\u5C40\u4E8B\u4EF6\u76D1\u542C\u5668\u3002",
        listenersRemoved: "\u5DF2\u4E3A\u9009\u53D6\u5143\u7D20\u626B\u63CF\u79FB\u9664\u5168\u5C40\u4E8B\u4EF6\u76D1\u542C\u5668\u3002",
        stateReset: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u72B6\u6001\u5DF2\u91CD\u7F6E\u3002",
        reselecting: "\u6B63\u5728\u8FD4\u56DE\u5143\u7D20\u91CD\u65B0\u9009\u62E9\u6A21\u5F0F\u3002",
        hovering: "\u6B63\u5728\u60AC\u505C\u4E8E <{{tagName}}>\u3002",
        escapePressed: "\u6309\u4E0B Escape \u952E\uFF0C\u6B63\u5728\u505C\u6B62\u9009\u53D6\u5143\u7D20\u626B\u63CF\u3002",
        clickedEnteringAdjust: "\u5143\u7D20 <{{tagName}}> \u5DF2\u88AB\u70B9\u51FB\uFF0C\u6B63\u5728\u8FDB\u5165\u8C03\u6574\u6A21\u5F0F\u3002",
        pathBuilt: "\u5143\u7D20\u5C42\u7EA7\u8DEF\u5F84\u5DF2\u6784\u5EFA\uFF0C\u6DF1\u5EA6\u4E3A\uFF1A{{depth}}\u3002",
        adjustingLevel: "\u6B63\u5728\u8C03\u6574\u9009\u62E9\u5C42\u7EA7\u81F3 {{level}} ({{tagName}})\u3002",
        confirmExtracting: "\u9009\u62E9\u5DF2\u786E\u8BA4\uFF0C\u6B63\u5728\u4ECE <{{tagName}}> \u63D0\u53D6\u6587\u672C\u3002",
        staged: "\u5143\u7D20\u5DF2\u6682\u5B58\u3002\u603B\u6570\uFF1A{{count}}\u3002",
        confirmingStaged: "\u786E\u8BA4\u9009\u62E9\u3002\u6B63\u5728\u5904\u7406 {{count}} \u4E2A\u5DF2\u6682\u5B58\u7684\u5143\u7D20\u3002",
        extractedCount: "\u5DF2\u4ECE\u5143\u7D20\u4E2D\u63D0\u53D6 {{count}} \u6761\u539F\u59CB\u6587\u672C\u3002",
        confirmFailedNoTarget: "\u786E\u8BA4\u5931\u8D25\uFF1A\u672A\u9009\u62E9\u4EFB\u4F55\u76EE\u6807\u5143\u7D20\u3002",
        rightClickExit: "\u68C0\u6D4B\u5230\u53F3\u952E\u70B9\u51FB\uFF0C\u6B63\u5728\u505C\u6B62\u9009\u53D6\u5143\u7D20\u626B\u63CF\u3002",
        processingError: "\u6587\u672C\u5904\u7406\u8FC7\u7A0B\u4E2D\u53D1\u751F\u9519\u8BEF: {{error}}",
        scrollListenersAdded: "\u5DF2\u4E3A {{count}} \u4E2A\u7236\u5143\u7D20\u6DFB\u52A0\u6EDA\u52A8\u76D1\u542C\u5668\u3002",
        scrollListenersRemoved: "\u5DF2\u79FB\u9664\u6240\u6709\u6EDA\u52A8\u76D1\u542C\u5668\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u6B63\u5728\u542F\u52A8...",
          sendingData: "\u6B63\u5728\u5411\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u53D1\u9001 {{count}} \u6761\u6587\u672C\u7247\u6BB5\u3002",
          completed: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u5DF2\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u6761\u4E0D\u91CD\u590D\u6587\u672C\u3002",
          initFailed: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u521D\u59CB\u5316\u5931\u8D25\u3002\u6D4F\u89C8\u5668\u7684CSP\u53EF\u80FD\u963B\u6B62\u4E86 data: URL\u3002",
          initSyncError: "\u9009\u53D6\u5143\u7D20\u626B\u63CF Worker \u521D\u59CB\u5316\u671F\u95F4\u53D1\u751F\u540C\u6B65\u9519\u8BEF: {{error}}",
          originalError: "\u539F\u59CB Worker \u9519\u8BEF: {{error}}"
        },
        switchToFallback: "\u6B63\u5728\u4E3A\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5207\u6362\u5230\u4E3B\u7EBF\u7A0B\u5907\u9009\u65B9\u6848\u3002",
        fallbackFailed: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u5907\u9009\u65B9\u6848\u6267\u884C\u5931\u8D25: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u9996\u6B21\u521B\u5EFA\u9AD8\u4EAE\u5143\u7D20\u3002",
        updatingHighlight: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u4E3A <{{tagName}}> \u66F4\u65B0\u9AD8\u4EAE\u3002",
        creatingToolbar: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u521B\u5EFA\u8C03\u6574\u5DE5\u5177\u680F\u3002",
        toolbarPositioned: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u5DE5\u5177\u680F\u5DF2\u5B9A\u4F4D\u3002",
        sliderChanged: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6ED1\u5757\u5C42\u7EA7\u53D8\u4E3A {{level}}",
        reselectClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u91CD\u65B0\u9009\u62E9\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        stageClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u6682\u5B58\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        cancelClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u53D6\u6D88\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        confirmClicked: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u201C\u786E\u8BA4\u201D\u6309\u94AE\u88AB\u70B9\u51FB\u3002",
        dragStarted: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u62D6\u52A8\u5F00\u59CB\u3002",
        dragEnded: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u62D6\u52A8\u7ED3\u675F\u3002",
        cleaningHighlights: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u9AD8\u4EAE\u5143\u7D20\u3002",
        cleaningToolbar: "\u5143\u7D20\u626B\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u5DE5\u5177\u680F\u3002"
      },
      eventBus: {
        callbackError: "\u4E8B\u4EF6 '{{eventName}}' \u7684\u56DE\u8C03\u51FD\u6570\u51FA\u9519:"
      },
      trustedTypes: {
        workerPolicyError: "\u521B\u5EFA Trusted Types worker \u7B56\u7565\u5931\u8D25:",
        htmlPolicyError: "\u521B\u5EFA Trusted Types HTML \u7B56\u7565\u5931\u8D25:",
        defaultWorkerPolicyWarning: "\u7528\u4E8E worker URL \u7684 Trusted Types \u9ED8\u8BA4\u7B56\u7565\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u539F\u59CB URL\u3002",
        defaultHtmlPolicyWarning: "\u7528\u4E8E HTML \u7684 Trusted Types \u9ED8\u8BA4\u7B56\u7565\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u539F\u59CB\u5B57\u7B26\u4E32\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\u9009\u53D6\u5143\u7D20\u626B\u63CF\u6559\u7A0B",
      elementScan: '<p class="tutorial-content">\u8FD9\u662F\u4E00\u4E2A\u7528\u4E8E\u9009\u53D6\u5143\u7D20\u626B\u63CF\u6559\u7A0B\u7684\u5360\u4F4D\u7B26\u3002\u652F\u6301\u5BCC\u6587\u672C\u683C\u5F0F\u3002</p>'
    }
  };
  var zh_TW_default = {
    common: {
      scan: "\u6383\u63CF",
      stop: "\u505C\u6B62",
      resume: "\u6062\u5FA9",
      clear: "\u6E05\u7A7A",
      copy: "\u8907\u88FD",
      save: "\u5132\u5B58",
      discovered: "\u5DF2\u767C\u73FE:",
      confirm: "\u78BA\u8A8D",
      cancel: "\u53D6\u6D88",
      export: "\u532F\u51FA",
      reselect: "\u91CD\u65B0\u9078\u64C7",
      stage: "\u66AB\u5B58"
    },
    export: {
      exportAsTxt: "\u532F\u51FA\u70BA TXT",
      exportAsJson: "\u532F\u51FA\u70BA JSON",
      exportAsCsv: "\u532F\u51FA\u70BA CSV",
      csv: {
        id: "ID",
        original: "\u539F\u6587",
        translation: "\u8B6F\u6587"
      }
    },
    settings: {
      title: "\u8A2D\u5B9A",
      theme: "\u4E3B\u984C",
      language: "\u8A9E\u8A00",
      relatedSettings: "\u76F8\u95DC\u8A2D\u5B9A",
      filterRules: "\u5167\u5BB9\u904E\u6FFE\u898F\u5247",
      filters: {
        numbers: "\u904E\u6FFE\u6578\u5B57/\u8CA8\u5E63",
        chinese: "\u904E\u6FFE\u7D14\u4E2D\u6587\u6587\u672C",
        contains_chinese: "\u904E\u6FFE\u542B\u4E2D\u6587\u7684\u6587\u672C",
        emoji_only: "\u904E\u6FFE\u7D14\u8868\u60C5\u7B26\u865F\u6587\u672C",
        symbols: "\u904E\u6FFE\u7D14\u7B26\u865F\u6587\u672C",
        term: "\u904E\u6FFE\u7279\u5B9A\u8853\u8A9E",
        single_letter: "\u904E\u6FFE\u55AE\u500B\u82F1\u6587\u5B57\u6BCD",
        repeating_chars: "\u904E\u6FFE\u91CD\u8907\u5B57\u5143",
        file_paths: "\u904E\u6FFE\u6A94\u6848\u8DEF\u5F91",
        hex_color_codes: "\u904E\u6FFE\u5341\u516D\u9032\u4F4D\u984F\u8272\u4EE3\u78BC",
        email_addresses: "\u904E\u6FFE\u96FB\u5B50\u90F5\u4EF6\u5730\u5740",
        uuids: "\u904E\u6FFE UUID",
        git_commit_hashes: "\u904E\u6FFE Git \u63D0\u4EA4\u96DC\u6E4A\u503C",
        website_urls: "\u904E\u6FFE\u7DB2\u7AD9\u9023\u7D50",
        website_urls_title: "\u904E\u6FFE\u7DB2\u7AD9\u9023\u7D50",
        shorthand_numbers: "\u904E\u6FFE\u901F\u8A18\u6578\u5B57",
        shorthand_numbers_title: "\u904E\u6FFE\u901F\u8A18\u6578\u5B57"
      },
      display: {
        show_fab: "\u986F\u793A\u61F8\u6D6E\u6309\u9215",
        fab_position: "\u61F8\u6D6E\u6309\u9215\u4F4D\u7F6E",
        fab_positions: {
          bottom_right: "\u53F3\u4E0B\u89D2",
          top_right: "\u53F3\u4E0A\u89D2",
          bottom_left: "\u5DE6\u4E0B\u89D2",
          top_left: "\u5DE6\u4E0A\u89D2"
        },
        show_line_numbers: "\u986F\u793A\u884C\u865F",
        show_statistics: "\u986F\u793A\u7D71\u8A08\u8CC7\u8A0A",
        enable_word_wrap: "\u555F\u7528\u81EA\u52D5\u63DB\u884C",
        text_truncation_limit: "\u555F\u7528\u6587\u672C\u622A\u65B7\u9650\u5236",
        character_limit: "\u5B57\u5143\u9650\u5236",
        show_scan_count: "\u5728\u6A19\u984C\u4E2D\u555F\u7528\u6383\u63CF\u8A08\u6578"
      },
      advanced: {
        enable_debug_logging: "\u555F\u7528\u5075\u932F\u65E5\u8A8C\u8A18\u9304"
      },
      panel: {
        title: "\u8A2D\u5B9A\u9762\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\u7B80\u4F53\u4E2D\u6587",
        zh_TW: "\u7E41\u9AD4\u4E2D\u6587"
      },
      themes: {
        light: "\u6DFA\u8272",
        dark: "\u6DF1\u8272",
        system: "\u8DDF\u96A8\u7CFB\u7D71"
      }
    },
    scan: {
      quick: "\u5FEB\u901F\u6383\u63CF",
      session: "\u6703\u8A71\u6383\u63CF",
      stagedCount: "\u5DF2\u66AB\u5B58:",
      elementFinished: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {{count}} \u689D\u6587\u672C\u3002",
      startSession: "\u958B\u59CB\u52D5\u614B\u6383\u63CF\u6703\u8A71",
      stopSession: "\u505C\u6B62\u52D5\u614B\u6383\u63CF\u6703\u8A71",
      finished: "\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {{count}} \u689D\u6587\u672C\u3002",
      quickFinished: "\u5FEB\u901F\u6383\u63CF\u5B8C\u6210\uFF0C\u767C\u73FE {{count}} \u689D\u6587\u672C\u3002",
      sessionStarted: "\u6703\u8A71\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
      sessionInProgress: "\u6383\u63CF\u9032\u884C\u4E2D...",
      truncationWarning: "\u70BA\u4FDD\u6301\u4ECB\u9762\u6D41\u66A2\uFF0C\u6B64\u8655\u50C5\u986F\u793A\u90E8\u5206\u6587\u672C\u3002\u532F\u51FA\u5F8C\u5C07\u5305\u542B\u5B8C\u6574\u5167\u5BB9\u3002"
    },
    results: {
      title: "\u63D0\u53D6\u7684\u6587\u672C",
      scanCountSession: "\u5DF2\u6383\u63CF {{count}} \u500B\u9805\u76EE",
      scanCountStatic: "\u5171\u6383\u63CF {{count}} \u500B\u9805\u76EE",
      totalCharacters: "\u7E3D\u5B57\u5143\u6578",
      totalLines: "\u7E3D\u884C\u6578",
      noSummary: "\u7121\u53EF\u7528\u6458\u8981",
      stats: {
        lines: "\u884C",
        chars: "\u5B57\u5143"
      }
    },
    notifications: {
      copiedToClipboard: "\u5DF2\u8907\u88FD\u5230\u526A\u8CBC\u7C3F\uFF01",
      settingsSaved: "\u8A2D\u5B9A\u5DF2\u5132\u5B58\uFF01",
      modalInitError: "\u6A21\u614B\u6846\u672A\u521D\u59CB\u5316\u3002",
      nothingToCopy: "\u6C92\u6709\u53EF\u8907\u88FD\u7684\u5167\u5BB9\u3002",
      contentCleared: "\u5167\u5BB9\u5DF2\u6E05\u9664\u3002",
      noTextSelected: "\u672A\u9078\u64C7\u4EFB\u4F55\u6587\u672C\u3002",
      scanFailed: "\u6383\u63CF\u5931\u6557\u3002",
      elementScanStarted: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
      cspWorkerWarning: "\u56E0\u7DB2\u7AD9\u5B89\u5168\u9650\u5236\uFF0C\u5DF2\u5207\u63DB\u81F3\u76F8\u5BB9\u6383\u63CF\u6A21\u5F0F\u3002"
    },
    placeholders: {
      click: "\u9EDE\u64CA ",
      dynamicScan: "[\u52D5\u614B\u6383\u63CF]",
      startNewScanSession: " \u958B\u59CB\u65B0\u7684\u6383\u63CF\u6703\u8A71",
      staticScan: "[\u975C\u614B\u6383\u63CF]",
      performOneTimeScan: " \u57F7\u884C\u4E00\u6B21\u6027\u5FEB\u901F\u63D0\u53D6"
    },
    confirmation: {
      clear: "\u60A8\u78BA\u5B9A\u8981\u6E05\u9664\u5167\u5BB9\u55CE\uFF1F\u6B64\u64CD\u4F5C\u7121\u6CD5\u64A4\u92B7\u3002"
    },
    tooltip: {
      summary: "\u67E5\u770B\u6458\u8981",
      dynamic_scan: "\u52D5\u614B\u6383\u63CF",
      static_scan: "\u975C\u614B\u6383\u63CF",
      element_scan: "\u9078\u53D6\u5143\u7D20\u6383\u63CF",
      disabled: {
        scan_in_progress: "\u53E6\u4E00\u9805\u6383\u63CF\u6B63\u5728\u9032\u884C\u4E2D"
      },
      filters: {
        title: "\u5167\u5BB9\u904E\u6FFE\u5668\u8AAA\u660E",
        numbers: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u6578\u5B57\u3001\u7A7A\u683C\u3001\u5343\u4F4D\u5206\u9694\u7B26(,)\u3001\u5C0F\u6578\u9EDE(.)\u4EE5\u53CA\u90E8\u5206\u8CA8\u5E63\u7B26\u865F($, \u20AC, \xA3, \xA5)\u7D44\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "1,234.56"<br>\u2022 "\xA5999"<br>\u2022 "\u20AC200"<br>\u2022 "$ 100"',
        chinese: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u6F22\u5B57\u548C\u7A7A\u683C\u7D44\u6210\uFF0C\u4E14\u4E0D\u542B\u4EFB\u4F55\u6A19\u9EDE\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "\u4F60\u597D \u4E16\u754C" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "\u4F60\u597D\uFF0C\u4E16\u754C" (\u4E0D\u6703\u88AB\u904E\u6FFE)',
        contains_chinese: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u4EFB\u4F55\u542B\u6709\u81F3\u5C11\u4E00\u500B\u6F22\u5B57\u7684\u6587\u672C\uFF0C\u7121\u8AD6\u5176\u4ED6\u5B57\u5143\u662F\u4EC0\u9EBC\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "\u4F60\u597D World" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "\u7B2C\u4E00\u7AE0" (\u5C07\u88AB\u904E\u6FFE)',
        emoji_only: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u4E00\u500B\u6216\u591A\u500B\u8868\u60C5\u7B26\u865F\u53CA\u7A7A\u683C\u7D44\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "\u{1F44D}"<br>\u2022 "\u{1F60A} \u{1F389} \u{1F680}"',
        symbols: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u5B8C\u5168</strong>\u7531\u5404\u7A2E\u6A19\u9EDE\u548C\u7B26\u865F\u7D44\u6210\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "@#*&^%"<br>\u2022 "()[]{}"<br>\u2022 "---...---"',
        term: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u901A\u5E38\u4E0D\u9700\u8981\u7FFB\u8B6F\u7684\u5E38\u898BUI\u8853\u8A9E\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "OK", "Cancel", "Submit"<br>\u2022 "Login", "Settings", "Help"',
        single_letter: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u7531<strong>\u55AE\u500B</strong>\u82F1\u6587\u5B57\u6BCD\u7D44\u6210\u7684\u6587\u672C\uFF08\u4E0D\u5340\u5206\u5927\u5C0F\u5BEB\uFF09\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "A" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "b" (\u5C07\u88AB\u904E\u6FFE)<br>\u2022 "AB" (\u4E0D\u6703\u88AB\u904E\u6FFE)',
        repeating_chars: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u7531<strong>\u540C\u4E00\u500B\u5B57\u5143</strong>\u9023\u7E8C\u91CD\u89072\u6B21\u6216\u4EE5\u4E0A\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "aa"<br>\u2022 "======"<br>\u2022 "bbbbb"',
        file_paths: '\u6B64\u898F\u5247\u5617\u8A66\u8B58\u5225\u4E26\u904E\u6FFE\u6389\u985E\u4F3C\u4F5C\u696D\u7CFB\u7D71\u6A94\u6848\u8DEF\u5F91\u4E14<strong>\u5305\u542B\u6A94\u6848\u526F\u6A94\u540D</strong>\u7684\u6587\u672C\u3002\u5B83\u4E0D\u5339\u914D\u7DB2\u5740\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "/path/to/file.js"<br>\u2022 "C:\\Users\\Test\\document.docx"<br>\u2022 "./config.json"',
        hex_color_codes: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u6A19\u6E96\u7684CSS\u5341\u516D\u9032\u4F4D\u984F\u8272\u4EE3\u78BC\uFF083\u30014\u30016\u62168\u4F4D\uFF0C\u5F8C\u8005\u5305\u542B\u900F\u660E\u5EA6\u901A\u9053\uFF09\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "#FFFFFF"<br>\u2022 "#ff0000"<br>\u2022 "#f0c"<br>\u2022 "#f0c8" (4\u4F4D)<br>\u2022 "#ff000080" (8\u4F4D)',
        email_addresses: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u7B26\u5408\u6A19\u6E96\u96FB\u5B50\u90F5\u4EF6\u5730\u5740\u683C\u5F0F\u7684\u6587\u672C\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "example@domain.com"<br>\u2022 "user.name@sub.domain.org"',
        uuids: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u901A\u7528\u552F\u4E00\u8B58\u5225\u78BC (UUID)\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u6A19\u6E96\u7684Git\u63D0\u4EA4\u96DC\u6E4A\u503C\uFF08\u9577\u6216\u77ED\uFF09\u3002<br><br><strong>\u7BC4\u4F8B:</strong><br>\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\u2022 "a1b2c3d"',
        website_urls: '\u6B64\u898F\u5247\u904E\u6FFE\u6389<strong>\u7368\u7ACB\u7684\u7DB2\u5740</strong>\u3002\u5B83\u8A2D\u8A08\u5F97\u6BD4\u8F03\u56B4\u683C\uFF0C\u4EE5\u907F\u514D\u610F\u5916\u79FB\u9664\u4E0D\u662F\u9023\u7D50\u7684\u6587\u672C\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "https://www.example.com"<br>\u2022 "http://test.co.uk"<br>\u2022 "www.google.com"<br>\u2022 "example.org"',
        shorthand_numbers: '\u6B64\u898F\u5247\u904E\u6FFE\u6389\u4F7F\u7528<strong>\u5E38\u898B\u901F\u8A18\u5F8C\u7DB4</strong>\u8868\u793A\u5343(k)\u3001\u767E\u842C(m)\u6216\u5341\u5104(b)\u7684\u6578\u5B57\uFF08\u4E0D\u5340\u5206\u5927\u5C0F\u5BEB\uFF09\u3002<br><br><strong>\u66F4\u591A\u7BC4\u4F8B:</strong><br>\u2022 "1.2k"<br>\u2022 "15M"<br>\u2022 "2.5b"<br>\u2022 "100K"'
      },
      display: {
        title: "\u986F\u793A\u8A2D\u5B9A\u8AAA\u660E",
        show_fab: "\u63A7\u5236\u662F\u5426\u5728\u7DB2\u9801\u53F3\u4E0B\u89D2\u986F\u793A<strong>\u61F8\u6D6E\u64CD\u4F5C\u6309\u9215(FAB)</strong>\u3002\u9019\u662F\u9032\u884C\u975C\u614B\u548C\u52D5\u614B\u6587\u672C\u63D0\u53D6\u7684\u4E3B\u8981\u5165\u53E3\u3002<br><br>\u5982\u679C\u60A8\u7981\u7528\u4E86\u6B64\u6309\u9215\uFF0C\u53EF\u4EE5\u900F\u904E\u6CB9\u7334\u64F4\u5145\u5957\u4EF6\u9078\u55AE\u4E2D\u7684\u8A2D\u5B9A\u9762\u677F\u91CD\u65B0\u555F\u7528\u5B83\u3002",
        show_scan_count: "\u555F\u7528\u5F8C\uFF0C\u7D50\u679C\u8996\u7A97\u7684\u6A19\u984C\u5217\u5C07<strong>\u5373\u6642\u986F\u793A</strong>\u76EE\u524D\u6383\u63CF\u4E2D\u627E\u5230\u7684\u7E3D\u6587\u672C\u9805\u76EE\u6578\u3002\u9019\u5C0D\u65BC\u76E3\u63A7\u9577\u6642\u9593\u57F7\u884C\u7684<strong>\u52D5\u614B\u6383\u63CF</strong>\u7684\u9032\u5EA6\u7279\u5225\u6709\u7528\u3002",
        show_line_numbers: "\u5728\u7D50\u679C\u8996\u7A97\u7684\u6587\u672C\u5340\u57DF\u5DE6\u5074\u986F\u793A\u884C\u865F\u3002\u7576\u60A8\u9700\u8981\u8A0E\u8AD6\u6216\u8A18\u9304\u7279\u5B9A\u6587\u672C\u884C\u6642\uFF0C\u9019\u63D0\u4F9B\u4E86\u4E00\u500B<strong>\u7CBE\u78BA\u7684\u53C3\u8003\u9EDE</strong>\u3002",
        show_statistics: "\u5728\u7D50\u679C\u8996\u7A97\u5E95\u90E8\u7684\u72C0\u614B\u5217\u4E2D\u986F\u793A\u6709\u95DC\u63D0\u53D6\u5167\u5BB9\u7684<strong>\u5373\u6642\u7D71\u8A08\u6578\u64DA</strong>\uFF0C\u5305\u62EC<strong>\u7E3D\u884C\u6578</strong>\u548C<strong>\u7E3D\u5B57\u5143\u6578</strong>\u3002\u9019\u6709\u52A9\u65BC\u60A8\u5FEB\u901F\u8A55\u4F30\u5167\u5BB9\u7684\u9AD4\u91CF\u3002",
        enable_word_wrap: "\u63A7\u5236\u7D50\u679C\u8996\u7A97\u4E2D\u9577\u6587\u672C\u884C\u7684\u986F\u793A\u65B9\u5F0F\u3002<br><br>\u2022 <strong>\u555F\u7528:</strong> \u9577\u884C\u5C07\u81EA\u52D5\u63DB\u884C\u4EE5\u9069\u61C9\u8996\u7A97\u5BEC\u5EA6\u3002<br>\u2022 <strong>\u7981\u7528:</strong> \u9577\u884C\u5C07\u4FDD\u6301\u5728\u55AE\u884C\uFF0C\u4E26\u51FA\u73FE\u6C34\u5E73\u6372\u8EF8\u3002",
        text_truncation_limit: "\u9019\u662F\u4E00\u500B<strong>\u6548\u80FD\u512A\u5316</strong>\u529F\u80FD\u3002\u5982\u679C\u8173\u672C\u63D0\u53D6\u5230<strong>\u6975\u9577\u7684\u55AE\u884C\u6587\u672C</strong>\uFF08\u4F8B\u5982\uFF0Cbase64\u7DE8\u78BC\u7684\u5716\u7247\uFF09\uFF0C\u53EF\u80FD\u6703\u5C0E\u81F4\u700F\u89BD\u5668<strong>\u5361\u9813\u6216\u7121\u56DE\u61C9</strong>\u3002<br><br>\u6B64\u8A2D\u5B9A\u6703\u622A\u65B7\u4EFB\u4F55\u8D85\u904E\u6307\u5B9A\u9577\u5EA6\u7684\u55AE\u884C\u6587\u672C\uFF0C\u4EE5\u78BA\u4FDDUI\u4FDD\u6301\u6D41\u66A2\u3002<strong>\u6CE8\u610F\uFF1A\u9019\u50C5\u5F71\u97FF\u986F\u793A\uFF1B\u532F\u51FA\u7684\u6A94\u6848\u4ECD\u5C07\u5305\u542B\u5B8C\u6574\u7684\u3001\u672A\u622A\u65B7\u7684\u5167\u5BB9\u3002</strong>"
      },
      advanced: {
        title: "\u9032\u968E\u8A2D\u5B9A\u8AAA\u660E",
        enable_debug_logging: "\u555F\u7528\u5F8C\uFF0C\u8173\u672C\u6703\u5C07\u8A73\u7D30\u7684\u5167\u90E8\u72C0\u614B\u3001\u57F7\u884C\u6B65\u9A5F\u548C\u932F\u8AA4\u8A0A\u606F\u8F38\u51FA\u5230\u700F\u89BD\u5668\u7684<strong>\u958B\u767C\u8005\u5DE5\u5177\u63A7\u5236\u53F0</strong>\uFF08\u901A\u5E38\u7528F12\u958B\u555F\uFF09\u3002\u9019\u4E3B\u8981\u4F9B\u958B\u767C\u8005\u6216\u9700\u8981\u63D0\u4EA4\u8A73\u7D30\u932F\u8AA4\u5831\u544A\u7684\u4F7F\u7528\u8005\u4F7F\u7528\u3002"
      }
    },
    log: {
      prefix: "[\u6587\u672C\u63D0\u53D6\u8173\u672C-\u5075\u932F]",
      language: {
        switched: "\u8A9E\u8A00\u5DF2\u5207\u63DB\u81F3\uFF1A{{lang}}",
        notFound: "\u672A\u627E\u5230\u8A9E\u8A00 '{{lang}}'\uFF0C\u5DF2\u56DE\u9000\u81F3 'en'\u3002"
      },
      settings: {
        changed: "\u8A2D\u5B9A '{{key}}' \u5DF2\u5F9E '{{oldValue}}' \u8B8A\u66F4\u70BA '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\u904E\u6FFE\u898F\u5247 '{{key}}' \u5DF2\u555F\u7528",
          disabled: "\u904E\u6FFE\u898F\u5247 '{{key}}' \u5DF2\u7981\u7528"
        },
        panel: {
          opening: "\u6B63\u5728\u958B\u555F\u8A2D\u5B9A\u9762\u677F...",
          closing: "\u6B63\u5728\u95DC\u9589\u8A2D\u5B9A\u9762\u677F...",
          saving: "\u6B63\u5728\u5132\u5B58\u8A2D\u5B9A..."
        },
        parseError: "\u89E3\u6790\u5DF2\u5132\u5B58\u7684\u8A2D\u5B9A\u6642\u51FA\u932F\uFF1A",
        invalidObject: "\u8A66\u5716\u70BA\u8A2D\u5B9A\u5132\u5B58\u4E00\u500B\u7121\u6548\u7269\u4EF6\uFF1A"
      },
      textProcessor: {
        filtered: '\u6587\u672C\u5DF2\u904E\u6FFE: "{{text}}" (\u539F\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\u5FEB\u901F\u6383\u63CF] \u6B63\u5728\u5207\u63DB\u5230\u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u3002",
        fallbackFailed: "[\u5FEB\u901F\u6383\u63CF] \u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u57F7\u884C\u5931\u6557: {{error}}",
        fallback: {
          starting: "[\u5FEB\u901F\u6383\u63CF - \u5099\u9078] \u6B63\u5728\u4E3B\u7DDA\u7A0B\u4E2D\u958B\u59CB\u8655\u7406...",
          completed: "[\u5FEB\u901F\u6383\u63CF - \u5099\u9078] \u8655\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u689D\u4E0D\u91CD\u8907\u6587\u672C\u3002"
        },
        worker: {
          logPrefix: "[\u5FEB\u901F\u6383\u63CF Worker]",
          starting: "[\u5FEB\u901F\u6383\u63CF] \u958B\u59CB\u57F7\u884C\uFF0C\u5617\u8A66\u4F7F\u7528 Web Worker...",
          completed: "[\u5FEB\u901F\u6383\u63CF] Worker \u8655\u7406\u6210\u529F\uFF0C\u6536\u5230 {{count}} \u689D\u6587\u672C\u3002",
          scanComplete: "[\u5FEB\u901F\u6383\u63CF Worker] \u8655\u7406\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u689D\u4E0D\u91CD\u8907\u6587\u672C\u3002\u6B63\u5728\u767C\u56DE\u4E3B\u7DDA\u7A0B...",
          initFailed: "[\u5FEB\u901F\u6383\u63CF] Worker \u521D\u59CB\u5316\u5931\u6557\u3002\u9019\u5F88\u53EF\u80FD\u662F\u7531\u65BC\u7DB2\u7AD9\u7684\u5167\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5C0E\u81F4\u7684\u3002",
          originalError: "[\u5FEB\u901F\u6383\u63CF] \u539F\u59CB\u932F\u8AA4: {{error}}",
          sendingData: "[\u5FEB\u901F\u6383\u63CF] Web Worker \u5DF2\u5EFA\u7ACB\uFF0C\u6B63\u5728\u767C\u9001 {{count}} \u689D\u6587\u672C\u9032\u884C\u8655\u7406...",
          initSyncError: "[\u5FEB\u901F\u6383\u63CF] Worker \u521D\u59CB\u5316\u671F\u9593\u767C\u751F\u540C\u6B65\u932F\u8AA4: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\u6703\u8A71\u6383\u63CF] \u6B63\u5728\u5207\u63DB\u5230\u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u3002",
        domObserver: {
          stopped: "[\u6703\u8A71\u6383\u63CF] \u5DF2\u505C\u6B62\u76E3\u807D DOM \u8B8A\u5316\u3002"
        },
        fallback: {
          initialized: "[\u6703\u8A71\u6383\u63CF - \u5099\u9078] \u5DF2\u521D\u59CB\u5316\u3002",
          cleared: "[\u6703\u8A71\u6383\u63CF - \u5099\u9078] \u8CC7\u6599\u5DF2\u6E05\u9664\u3002"
        },
        worker: {
          logPrefix: "[\u6703\u8A71\u6383\u63CF Worker]",
          starting: "\u6703\u8A71\u6383\u63CF\uFF1A\u6B63\u5728\u5617\u8A66\u555F\u52D5 Web Worker...",
          initFailed: "[\u6703\u8A71\u6383\u63CF] Worker \u521D\u59CB\u5316\u5931\u6557\u3002\u9019\u5F88\u53EF\u80FD\u662F\u7531\u65BC\u7DB2\u7AD9\u7684\u5167\u5BB9\u5B89\u5168\u7B56\u7565 (CSP) \u5C0E\u81F4\u7684\u3002",
          originalError: "[\u6703\u8A71\u6383\u63CF] \u539F\u59CB\u932F\u8AA4: {{error}}",
          initialized: "[\u6703\u8A71\u6383\u63CF] Worker \u521D\u59CB\u5316\u6210\u529F\uFF0C\u5DF2\u767C\u9001 {{count}} \u689D\u521D\u59CB\u6587\u672C\u4EE5\u958B\u59CB\u6703\u8A71\u3002",
          initSyncError: "[\u6703\u8A71\u6383\u63CF] Worker \u521D\u59CB\u5316\u671F\u9593\u767C\u751F\u540C\u6B65\u932F\u8AA4: {{error}}",
          clearCommandSent: "[\u6703\u8A71\u6383\u63CF] \u6E05\u9664\u547D\u4EE4\u5DF2\u767C\u9001\u81F3 worker\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\u8907\u88FD\u6309\u9215\u5DF2\u9EDE\u64CA\uFF0C\u8907\u88FD\u4E86 {{count}} \u500B\u5B57\u5143\u3002",
          nothingToCopy: "\u8907\u88FD\u6309\u9215\u5DF2\u9EDE\u64CA\uFF0C\u4F46\u6C92\u6709\u5167\u5BB9\u53EF\u8907\u88FD\u6216\u6309\u9215\u88AB\u7981\u7528\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\u4F7F\u7528\u8005\u5DF2\u78BA\u8A8D\u6E05\u9664\u6703\u8A71\u6383\u63CF\u6587\u672C\uFF0C\u6B63\u5728\u8ABF\u7528\u56DE\u547C..."
          },
          quickScan: {
            confirmed: "\u4F7F\u7528\u8005\u5DF2\u78BA\u8A8D\u6E05\u9664\u5FEB\u901F\u6383\u63CF\u6587\u672C\u3002"
          },
          cancelled: "\u4F7F\u7528\u8005\u5DF2\u53D6\u6D88\u6E05\u9664\u64CD\u4F5C\u3002"
        },
        modal: {
          opening: "\u6B63\u5728\u958B\u555F\u4E3B\u6A21\u614B\u6846...",
          closing: "\u6B63\u5728\u95DC\u9589\u4E3B\u6A21\u614B\u6846...",
          scanFailed: "\u975C\u614B\u6383\u63CF\u5931\u6557: {{error}}",
          clearContent: "\u6E05\u7A7A\u5167\u5BB9\u6309\u9215\u5DF2\u9EDE\u64CA\u3002"
        }
      },
      exporter: {
        buttonClicked: "\u532F\u51FA\u6309\u9215\u5DF2\u9EDE\u64CA\uFF0C\u683C\u5F0F: {{format}}\u3002",
        csvError: "\u89E3\u6790\u6587\u672C\u4E26\u7522\u751FCSV\u6642\u51FA\u932F: {{error}}",
        fileExported: "\u6A94\u6848\u5DF2\u532F\u51FA: {{filename}}",
        noContent: "\u7121\u5167\u5BB9\u53EF\u532F\u51FA\u3002",
        unknownFormat: "\u672A\u77E5\u7684\u532F\u51FA\u683C\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\u6B63\u5728\u8ACB\u6C42\u6703\u8A71\u6383\u63CF\u6A21\u5F0F\u7684\u5B8C\u6574\u8CC7\u6599...",
        exportingQuickScanData: "\u6B63\u5728\u532F\u51FA\u5FEB\u901F\u6383\u63CF\u6A21\u5F0F\u8A18\u61B6\u9AD4\u4E2D\u7684\u5B8C\u6574\u8CC7\u6599...",
        inIframe: "\u8173\u672C\u5728 iframe \u4E2D\uFF0C\u5DF2\u8DF3\u904E\u521D\u59CB\u5316\u3002",
        initializing: "\u8173\u672C\u521D\u59CB\u5316\u958B\u59CB...",
        initialSettingsLoaded: "\u521D\u59CB\u8A2D\u5B9A\u5DF2\u8F09\u5165:"
      },
      dom: {
        ttpCreationError: "\u5EFA\u7ACB Trusted Type \u7B56\u7565\u5931\u6557:",
        svgParseError: "SVG \u5B57\u4E32\u7121\u6548\u6216\u89E3\u6790\u5931\u6557:"
      },
      elementScan: {
        starting: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u958B\u59CB\u3002",
        stopping: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5DF2\u505C\u6B62\u3002",
        listenersAdded: "\u5DF2\u70BA\u9078\u53D6\u5143\u7D20\u6383\u63CF\u65B0\u589E\u5168\u57DF\u4E8B\u4EF6\u76E3\u807D\u5668\u3002",
        listenersRemoved: "\u5DF2\u70BA\u9078\u53D6\u5143\u7D20\u6383\u63CF\u79FB\u9664\u5168\u57DF\u4E8B\u4EF6\u76E3\u807D\u5668\u3002",
        stateReset: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u72C0\u614B\u5DF2\u91CD\u8A2D\u3002",
        reselecting: "\u6B63\u5728\u8FD4\u56DE\u5143\u7D20\u91CD\u65B0\u9078\u64C7\u6A21\u5F0F\u3002",
        hovering: "\u6B63\u5728\u61F8\u505C\u65BC <{{tagName}}>\u3002",
        escapePressed: "\u6309\u4E0B Escape \u9375\uFF0C\u6B63\u5728\u505C\u6B62\u9078\u53D6\u5143\u7D20\u6383\u63CF\u3002",
        clickedEnteringAdjust: "\u5143\u7D20 <{{tagName}}> \u5DF2\u88AB\u9EDE\u64CA\uFF0C\u6B63\u5728\u9032\u5165\u8ABF\u6574\u6A21\u5F0F\u3002",
        pathBuilt: "\u5143\u7D20\u5C64\u7D1A\u8DEF\u5F91\u5DF2\u69CB\u5EFA\uFF0C\u6DF1\u5EA6\u70BA\uFF1A{{depth}}\u3002",
        adjustingLevel: "\u6B63\u5728\u8ABF\u6574\u9078\u64C7\u5C64\u7D1A\u81F3 {{level}} ({{tagName}})\u3002",
        confirmExtracting: "\u9078\u64C7\u5DF2\u78BA\u8A8D\uFF0C\u6B63\u5728\u5F9E <{{tagName}}> \u63D0\u53D6\u6587\u672C\u3002",
        staged: "\u5143\u7D20\u5DF2\u66AB\u5B58\u3002\u7E3D\u6578\uFF1A{{count}}\u3002",
        confirmingStaged: "\u78BA\u8A8D\u9078\u64C7\u3002\u6B63\u5728\u8655\u7406 {{count}} \u500B\u5DF2\u66AB\u5B58\u7684\u5143\u7D20\u3002",
        extractedCount: "\u5DF2\u5F9E\u5143\u7D20\u4E2D\u63D0\u53D6 {{count}} \u689D\u539F\u59CB\u6587\u672C\u3002",
        confirmFailedNoTarget: "\u78BA\u8A8D\u5931\u6557\uFF1A\u672A\u9078\u64C7\u4EFB\u4F55\u76EE\u6A19\u5143\u7D20\u3002",
        rightClickExit: "\u5075\u6E2C\u5230\u53F3\u9375\u9EDE\u64CA\uFF0C\u6B63\u5728\u505C\u6B62\u9078\u53D6\u5143\u7D20\u6383\u63CF\u3002",
        processingError: "\u6587\u672C\u8655\u7406\u904E\u7A0B\u4E2D\u767C\u751F\u932F\u8AA4: {{error}}",
        scrollListenersAdded: "\u5DF2\u70BA {{count}} \u500B\u7236\u5143\u7D20\u65B0\u589E\u6EFE\u52D5\u76E3\u807D\u5668\u3002",
        scrollListenersRemoved: "\u5DF2\u79FB\u9664\u6240\u6709\u6EFE\u52D5\u76E3\u807D\u5668\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u6B63\u5728\u555F\u52D5...",
          sendingData: "\u6B63\u5728\u5411\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u767C\u9001 {{count}} \u689D\u6587\u672C\u7247\u6BB5\u3002",
          completed: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u5DF2\u5B8C\u6210\uFF0C\u627E\u5230 {{count}} \u689D\u4E0D\u91CD\u8907\u6587\u672C\u3002",
          initFailed: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u521D\u59CB\u5316\u5931\u6557\u3002\u700F\u89BD\u5668\u7684CSP\u53EF\u80FD\u963B\u6B62\u4E86 data: URL\u3002",
          initSyncError: "\u9078\u53D6\u5143\u7D20\u6383\u63CF Worker \u521D\u59CB\u5316\u671F\u9593\u767C\u751F\u540C\u6B65\u932F\u8AA4: {{error}}",
          originalError: "\u539F\u59CB Worker \u932F\u8AA4: {{error}}"
        },
        switchToFallback: "\u6B63\u5728\u70BA\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5207\u63DB\u5230\u4E3B\u7DDA\u7A0B\u5099\u9078\u65B9\u6848\u3002",
        fallbackFailed: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u5099\u9078\u65B9\u6848\u57F7\u884C\u5931\u6557: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u9996\u6B21\u5EFA\u7ACB\u9AD8\u4EAE\u5143\u7D20\u3002",
        updatingHighlight: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u70BA <{{tagName}}> \u66F4\u65B0\u9AD8\u4EAE\u3002",
        creatingToolbar: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u5EFA\u7ACB\u8ABF\u6574\u5DE5\u5177\u5217\u3002",
        toolbarPositioned: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u5DE5\u5177\u5217\u5DF2\u5B9A\u4F4D\u3002",
        sliderChanged: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6ED1\u687F\u5C64\u7D1A\u8B8A\u70BA {{level}}",
        reselectClicked: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u300C\u91CD\u65B0\u9078\u64C7\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        stageClicked: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u300C\u66AB\u5B58\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        cancelClicked: "\u5143\u7D20\u6383\u89C0UI\uFF1A\u300C\u53D6\u6D88\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        confirmClicked: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u300C\u78BA\u8A8D\u300D\u6309\u9215\u88AB\u9EDE\u64CA\u3002",
        dragStarted: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u62D6\u52D5\u958B\u59CB\u3002",
        dragEnded: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u62D6\u52D5\u7D50\u675F\u3002",
        cleaningHighlights: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u9AD8\u4EAE\u5143\u7D20\u3002",
        cleaningToolbar: "\u5143\u7D20\u6383\u63CFUI\uFF1A\u6B63\u5728\u6E05\u7406\u5DE5\u5177\u5217\u3002"
      },
      eventBus: {
        callbackError: "\u4E8B\u4EF6 '{{eventName}}' \u7684\u56DE\u547C\u51FD\u6578\u51FA\u932F:"
      },
      trustedTypes: {
        workerPolicyError: "\u5EFA\u7ACB Trusted Types worker \u7B56\u7565\u5931\u6557:",
        htmlPolicyError: "\u5EFA\u7ACB Trusted Types HTML \u7B56\u7565\u5931\u6557:",
        defaultWorkerPolicyWarning: "\u7528\u65BC worker URL \u7684 Trusted Types \u9810\u8A2D\u7B56\u7565\u5931\u6557\uFF0C\u56DE\u9000\u5230\u539F\u59CB URL\u3002",
        defaultHtmlPolicyWarning: "\u7528\u65BC HTML \u7684 Trusted Types \u9810\u8A2D\u7B56\u7565\u5931\u6557\uFF0C\u56DE\u9000\u5230\u539F\u59CB\u5B57\u4E32\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\u9078\u53D6\u5143\u7D20\u6383\u63CF\u6559\u5B78",
      elementScan: '<p class="tutorial-content">\u9019\u662F\u4E00\u500B\u7528\u65BC\u9078\u53D6\u5143\u7D20\u6383\u63CF\u6559\u5B78\u7684\u4F54\u4F4D\u7B26\u3002\u652F\u63F4\u5BCC\u6587\u672C\u683C\u5F0F\u3002</p>'
    }
  };
  var isDebugEnabled = false;
  function updateLoggerState(isEnabled) {
    isDebugEnabled = isEnabled;
  }
  function log(...args) {
    if (isDebugEnabled) {
      console.log(t("log.prefix"), ...args);
    }
  }
  var events = {};
  function on(eventName, callback) {
    if (!events[eventName]) {
      events[eventName] = [];
    }
    events[eventName].push(callback);
    return () => {
      events[eventName] = events[eventName].filter((cb) => cb !== callback);
    };
  }
  function fire(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          log(t("log.eventBus.callbackError", { eventName }), error);
        }
      });
    }
  }
  var supportedLanguages = [
    { code: "en", name: "English" },
    { code: "zh-CN", name: "\u7B80\u4F53\u4E2D\u6587" },
    { code: "zh-TW", name: "\u7E41\u9AD4\u4E2D\u6587" }
  ];
  var translationModules = {
    en: en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
  var translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
      acc[lang.code] = translationModules[lang.code];
    }
    return acc;
  }, {});
  var currentLanguage = "en";
  var currentTranslations = translations.en;
  function setLanguage(lang) {
    if (translations[lang]) {
      currentLanguage = lang;
      currentTranslations = translations[lang];
      log(t("log.language.switched", { lang }));
      fire("languageChanged", lang);
    } else {
      log(t("log.language.notFound", { lang }), "warn");
      currentLanguage = "en";
      currentTranslations = translations.en;
    }
  }
  function t(key, replacements) {
    let value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    if (value === void 0) {
      return key;
    }
    if (replacements) {
      Object.keys(replacements).forEach((placeholder3) => {
        const regex = new RegExp(`{{${placeholder3}}}`, "g");
        value = value.replace(regex, replacements[placeholder3]);
      });
    }
    return value;
  }
  function getAvailableLanguages() {
    return supportedLanguages.map((lang) => ({
      value: lang.code,
      label: lang.name
    }));
  }
  var selectSettingsDefinitions = [
    {
      id: "theme-select",
      key: "theme",
      label: "settings.theme",
      icon: themeIcon,
      options: [
        { value: "light", label: "settings.themes.light" },
        { value: "dark", label: "settings.themes.dark" },
        { value: "system", label: "settings.themes.system" }
      ]
    },
    {
      id: "language-select",
      key: "language",
      label: "settings.language",
      icon: languageIcon_default,
      options: getAvailableLanguages()
    }
  ];
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "settings.filters.numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.numbers", text: "tooltip.filters.numbers" } },
    { id: "filter-chinese", key: "chinese", label: "settings.filters.chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.chinese", text: "tooltip.filters.chinese" } },
    { id: "filter-contains-chinese", key: "containsChinese", label: "settings.filters.contains_chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.contains_chinese", text: "tooltip.filters.contains_chinese" } },
    { id: "filter-emoji-only", key: "emojiOnly", label: "settings.filters.emoji_only", tooltip: { titleIcon: infoIcon, title: "settings.filters.emoji_only", text: "tooltip.filters.emoji_only" } },
    { id: "filter-symbols", key: "symbols", label: "settings.filters.symbols", tooltip: { titleIcon: infoIcon, title: "settings.filters.symbols", text: "tooltip.filters.symbols" } },
    { id: "filter-term", key: "termFilter", label: "settings.filters.term", tooltip: { titleIcon: infoIcon, title: "settings.filters.term", text: "tooltip.filters.term" } },
    { id: "filter-single-letter", key: "singleLetter", label: "settings.filters.single_letter", tooltip: { titleIcon: infoIcon, title: "settings.filters.single_letter", text: "tooltip.filters.single_letter" } },
    {
      id: "filter-repeating-chars",
      key: "repeatingChars",
      label: "settings.filters.repeating_chars",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.repeating_chars",
        text: "tooltip.filters.repeating_chars"
      }
    },
    { id: "filter-file-paths", key: "filePath", label: "settings.filters.file_paths", tooltip: { titleIcon: infoIcon, title: "settings.filters.file_paths", text: "tooltip.filters.file_paths" } },
    { id: "filter-hex-colors", key: "hexColor", label: "settings.filters.hex_color_codes", tooltip: { titleIcon: infoIcon, title: "settings.filters.hex_color_codes", text: "tooltip.filters.hex_color_codes" } },
    { id: "filter-emails", key: "email", label: "settings.filters.email_addresses", tooltip: { titleIcon: infoIcon, title: "settings.filters.email_addresses", text: "tooltip.filters.email_addresses" } },
    { id: "filter-uuids", key: "uuid", label: "settings.filters.uuids", tooltip: { titleIcon: infoIcon, title: "settings.filters.uuids", text: "tooltip.filters.uuids" } },
    { id: "filter-git-hashes", key: "gitCommitHash", label: "settings.filters.git_commit_hashes", tooltip: { titleIcon: infoIcon, title: "settings.filters.git_commit_hashes", text: "tooltip.filters.git_commit_hashes" } },
    { id: "filter-website-urls", key: "websiteUrl", label: "settings.filters.website_urls", tooltip: { titleIcon: infoIcon, title: "settings.filters.website_urls_title", text: "tooltip.filters.website_urls" } },
    { id: "filter-shorthand-numbers", key: "shorthandNumber", label: "settings.filters.shorthand_numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.shorthand_numbers_title", text: "tooltip.filters.shorthand_numbers" } }
  ];
  var relatedSettingsDefinitions = [
    { id: "show-fab", key: "showFab", label: "settings.display.show_fab", tooltip: { titleIcon: infoIcon, title: "settings.display.show_fab", text: "tooltip.display.show_fab" } },
    {
      id: "fab-position",
      key: "fabPosition",
      label: "settings.display.fab_position",
      type: "select",
      options: [
        { value: "bottom-right", label: "settings.display.fab_positions.bottom_right" },
        { value: "top-right", label: "settings.display.fab_positions.top_right" },
        { value: "bottom-left", label: "settings.display.fab_positions.bottom_left" },
        { value: "top-left", label: "settings.display.fab_positions.top_left" }
      ]
    },
    { id: "show-scan-count", key: "showScanCount", label: "settings.display.show_scan_count", tooltip: { titleIcon: infoIcon, title: "settings.display.show_scan_count", text: "tooltip.display.show_scan_count" } },
    { id: "show-line-numbers", key: "showLineNumbers", label: "settings.display.show_line_numbers", tooltip: { titleIcon: infoIcon, title: "settings.display.show_line_numbers", text: "tooltip.display.show_line_numbers" } },
    { id: "show-statistics", key: "showStatistics", label: "settings.display.show_statistics", tooltip: { titleIcon: infoIcon, title: "settings.display.show_statistics", text: "tooltip.display.show_statistics" } },
    { id: "enable-word-wrap", key: "enableWordWrap", label: "settings.display.enable_word_wrap", tooltip: { titleIcon: infoIcon, title: "settings.display.enable_word_wrap", text: "tooltip.display.enable_word_wrap" } },
    {
      id: "enable-text-truncation",
      key: "enableTextTruncation",
      label: "settings.display.text_truncation_limit",
      linkedNumeric: {
        id: "text-truncation-length",
        key: "textTruncationLength"
      },
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.display.text_truncation_limit",
        text: "tooltip.display.text_truncation_limit"
      }
    },
    { id: "enable-debug-logging", key: "enableDebugLogging", label: "settings.advanced.enable_debug_logging", tooltip: { titleIcon: infoIcon, title: "settings.advanced.enable_debug_logging", text: "tooltip.advanced.enable_debug_logging" } }
  ];
  var appConfig = {
    ui: {
      fabAnimationDelay: 50,
      tooltips: {
        summary: "\u67E5\u770B\u603B\u7ED3\u6587\u672C",
        dynamicScan: "\u52A8\u6001\u626B\u63CF",
        staticScan: "\u9759\u6001\u626B\u63CF"
      },
      liveCounterPrefix: "\u5DF2\u53D1\u73B0\uFF1A",
      modalContentHeight: "400px",
      notificationDuration: 3e3
    },
    scanner: {
      targetSelectors: [
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "li",
        "td",
        "th",
        "pre",
        "span",
        "a",
        "button",
        "article",
        "main",
        "div",
        "body *"
      ],
      attributesToExtract: ["placeholder", "alt", "title", "aria-label"],
      ignoredSelectors: [
        "script",
        "style",
        "noscript",
        "code",
        "pre",
        "kbd",
        ".no-translate",
        ".view-line"
      ]
    }
  };
  var registerMenuCommand = (caption, commandFunc) => {
    return GM_registerMenuCommand(caption, commandFunc);
  };
  var unregisterMenuCommand = (commandId) => {
    GM_unregisterMenuCommand(commandId);
  };
  var setClipboard = (text) => {
    GM_setClipboard(text, "text");
  };
  var getValue = (key, defaultValue) => {
    return GM_getValue(key, defaultValue);
  };
  var setValue = (key, value) => {
    return GM_setValue(key, value);
  };
  function initTheme() {
    const { theme } = loadSettings();
    applyTheme(theme);
  }
  function applyTheme(theme) {
    let finalTheme = theme;
    if (theme === "system") {
      finalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    uiContainer.host.setAttribute("data-theme", finalTheme);
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const { theme } = loadSettings();
    if (theme === "system") {
      applyTheme("system");
    }
  });
  var SETTINGS_MENU_ID_KEY = "settings_menu_command_id";
  async function updateSettingsMenu(onClick) {
    const oldCommandId = await getValue(SETTINGS_MENU_ID_KEY, null);
    if (oldCommandId) {
      unregisterMenuCommand(oldCommandId);
    }
    const menuText = t("settings.panel.title");
    const newCommandId = registerMenuCommand(menuText, onClick);
    await setValue(SETTINGS_MENU_ID_KEY, newCommandId);
  }
  function isLanguageSupported(langCode) {
    return supportedLanguages.some((lang) => lang.code === langCode);
  }
  function initializeLanguage(settings) {
    let langToSet = "en";
    const savedLang = settings.language;
    if (savedLang && savedLang !== "auto") {
      if (isLanguageSupported(savedLang)) {
        langToSet = savedLang;
      }
    } else {
      const browserLang = navigator.language;
      if (isLanguageSupported(browserLang)) {
        langToSet = browserLang;
      }
    }
    setLanguage(langToSet);
  }
  function switchLanguage(langCode) {
    if (isLanguageSupported(langCode)) {
      setLanguage(langCode);
      const settings = loadSettings();
      settings.language = langCode;
      saveSettings(settings);
    }
  }
  var IGNORED_TERMS = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript",
    "TypeScript",
    "Hugging Face",
    "Google",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "OpenAI",
    "ChatGPT",
    "API",
    "Glossary of computer science",
    "HTML",
    "CSS",
    "JSON",
    "XML",
    "HTTP",
    "HTTPS",
    "URL",
    "IP address",
    "DNS",
    "CPU",
    "GPU",
    "RAM",
    "SSD",
    "USB",
    "Wi-Fi",
    "Bluetooth",
    "VPN",
    "AI"
  ];
  var ignoredTerms_default = IGNORED_TERMS;
  var filterConfigMap = new Map(filterDefinitions.map((def) => [def.key, def.label]));
  var ruleChecks =  new Map([
    ["numbers", {
      regex: /^[$\€\£\¥\d,.\s]+$/,
      label: filterConfigMap.get("numbers")
    }],
    ["chinese", {
      regex: /^[\u4e00-\u9fa5\s]+$/u,
      label: filterConfigMap.get("chinese")
    }],
    ["containsChinese", {
      regex: /[\u4e00-\u9fa5]/u,
      label: filterConfigMap.get("containsChinese")
    }],
    ["emojiOnly", {
      regex: /^[\p{Emoji}\s]+$/u,
      label: filterConfigMap.get("emojiOnly")
    }],
    ["symbols", {
      test: (text) => !/[\p{L}\p{N}]/u.test(text),
      label: filterConfigMap.get("symbols")
    }],
    ["termFilter", {
      test: (text) => ignoredTerms_default.includes(text),
      label: filterConfigMap.get("termFilter")
    }],
    ["singleLetter", {
      regex: /^[a-zA-Z]$/,
      label: filterConfigMap.get("singleLetter")
    }],
    ["repeatingChars", {
      regex: /^\s*(.)\1+\s*$/,
      label: filterConfigMap.get("repeatingChars")
    }],
    ["filePath", {
      regex: /^(?:[a-zA-Z]:\\|\\\\|~|\.\.?\/)[\w\-\.\/ \\]*[\w\-\.]+\.[\w]{2,4}$/,
      label: filterConfigMap.get("filePath")
    }],
    ["hexColor", {
      regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
      label: filterConfigMap.get("hexColor")
    }],
    ["email", {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      label: filterConfigMap.get("email")
    }],
    ["uuid", {
      regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      label: filterConfigMap.get("uuid")
    }],
    ["gitCommitHash", {
      regex: /^[0-9a-f]{7,40}$/i,
      label: filterConfigMap.get("gitCommitHash")
    }],
    ["websiteUrl", {
      regex: /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/,
      label: filterConfigMap.get("websiteUrl")
    }],
    ["shorthandNumber", {
      regex: /^\d+(\.\d+)?\s?[kmb]$/i,
      label: filterConfigMap.get("shorthandNumber")
    }]
  ]);
  function shouldFilter(text, filterRules2) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules2[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return t(rule.label);
        }
      }
    }
    return null;
  }
  var extractAndProcessText = () => {
    const settings = loadSettings();
    const { filterRules: filterRules2 } = settings;
    const uniqueTexts =  new Set();
    const processAndAddText = (rawText) => {
      if (!rawText) return;
      const normalizedText = rawText.normalize("NFC");
      let text = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n");
      if (text.trim() === "") {
        return;
      }
      const trimmedText = text.trim();
      const filterReason = shouldFilter(trimmedText, filterRules2);
      if (filterReason) {
        log(t("log.textProcessor.filtered", { text: trimmedText, reason: filterReason }));
        return;
      }
      uniqueTexts.add(text);
    };
    processAndAddText(document.title);
    const targetElements = document.querySelectorAll(appConfig.scanner.targetSelectors.join(", "));
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(", ");
    targetElements.forEach((element) => {
      if (element.closest(ignoredSelectorString)) {
        return;
      }
      const attributesToExtract = appConfig.scanner.attributesToExtract;
      if (element.tagName === "INPUT" && ["button", "submit", "reset"].includes(element.type)) {
        const dynamicAttributes = [...attributesToExtract, "value"];
        dynamicAttributes.forEach((attr) => {
          const attrValue = element.getAttribute(attr);
          if (attrValue) {
            processAndAddText(attrValue);
          }
        });
      } else {
        attributesToExtract.forEach((attr) => {
          const attrValue = element.getAttribute(attr);
          if (attrValue) {
            processAndAddText(attrValue);
          }
        });
      }
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE" || parent.closest(ignoredSelectorString))) {
          continue;
        }
        if (parent && parent.closest(".text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay")) {
          continue;
        }
        processAndAddText(node.nodeValue);
      }
    });
    return Array.from(uniqueTexts);
  };
  var extractAndProcessTextFromElement = (element) => {
    if (!element) return [];
    const settings = loadSettings();
    const { filterRules: filterRules2 } = settings;
    const uniqueTexts =  new Set();
    const processAndAddText = (rawText) => {
      if (!rawText) return;
      const normalizedText = rawText.normalize("NFC");
      let text = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n");
      if (text.trim() === "") return;
      const trimmedText = text.trim();
      const filterReason = shouldFilter(trimmedText, filterRules2);
      if (filterReason) {
        log(t("log.textProcessor.filtered", { text: trimmedText, reason: filterReason }));
        return;
      }
      uniqueTexts.add(text);
    };
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(", ");
    if (element.closest(ignoredSelectorString)) {
      return [];
    }
    const attributesToExtract = appConfig.scanner.attributesToExtract;
    attributesToExtract.forEach((attr) => {
      const attrValue = element.getAttribute(attr);
      if (attrValue) {
        processAndAddText(attrValue);
      }
    });
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE" || parent.closest(ignoredSelectorString) || parent.closest(".text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay"))) {
        continue;
      }
      processAndAddText(node.nodeValue);
    }
    return Array.from(uniqueTexts);
  };
  var workerPolicy;
  var htmlPolicy;
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    try {
      workerPolicy = window.trustedTypes.createPolicy("text-extractor-worker", {
        createScriptURL: (url) => url
      });
    } catch (e) {
      if (!(e.name === "TypeError" && e.message.includes("Policy already exists"))) {
        log(t("log.trustedTypes.workerPolicyError"), e);
      }
    }
    try {
      htmlPolicy = window.trustedTypes.createPolicy("text-extractor-html", {
        createHTML: (htmlString) => htmlString
      });
    } catch (e) {
      if (!(e.name === "TypeError" && e.message.includes("Policy already exists"))) {
        log(t("log.trustedTypes.htmlPolicyError"), e);
      }
    }
  }
  function createTrustedWorkerUrl(url) {
    if (workerPolicy) {
      return workerPolicy.createScriptURL(url);
    }
    if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
      try {
        return window.trustedTypes.defaultPolicy.createScriptURL(url);
      } catch (e) {
        log(t("log.trustedTypes.defaultWorkerPolicyWarning"), e, true);
      }
    }
    return url;
  }
  function createTrustedHTML(htmlString) {
    if (htmlPolicy) {
      return htmlPolicy.createHTML(htmlString);
    }
    if (window.trustedTypes && window.trustedTypes.defaultPolicy) {
      try {
        return window.trustedTypes.defaultPolicy.createHTML(htmlString);
      } catch (e) {
        log(t("log.trustedTypes.defaultHtmlPolicyWarning"), e, true);
      }
    }
    return htmlString;
  }
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`
    );
    return `[
${result.join(",\n")}
]`;
  };
  var performScanInMainThread = (texts, filterRules2, enableDebugLogging) => {
    log(t("log.quickScan.fallback.starting"));
    const uniqueTexts =  new Set();
    if (Array.isArray(texts)) {
      texts.forEach((rawText) => {
        if (!rawText || typeof rawText !== "string") return;
        const normalizedText = rawText.normalize("NFC");
        const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n").trim();
        if (textForFiltering === "") return;
        const filterResult = shouldFilter(textForFiltering, filterRules2);
        if (filterResult) {
          if (enableDebugLogging) {
            log(t("log.textProcessor.filtered", { text: textForFiltering, reason: filterResult }));
          }
          return;
        }
        uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, "\n"));
      });
    }
    const textsArray = Array.from(uniqueTexts);
    const formattedText = formatTextsForTranslation(textsArray);
    log(t("log.quickScan.fallback.completed", { count: textsArray.length }));
    return {
      formattedText,
      count: textsArray.length
    };
  };
  var trustedTypePolicy = null;
  var policyCreated = false;
  function createTrustedTypePolicy() {
    if (policyCreated) {
      return trustedTypePolicy;
    }
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
      try {
        trustedTypePolicy = window.trustedTypes.createPolicy("script-svg-policy", {
          createHTML: (input) => {
            return input;
          }
        });
      } catch (e) {
        if (e.message.includes("already exists")) {
          trustedTypePolicy = window.trustedTypes.policies.get("script-svg-policy");
        } else {
          log(t("log.dom.ttpCreationError"), e);
        }
      }
    }
    policyCreated = true;
    return trustedTypePolicy;
  }
  function createSVGFromString(svgString) {
    if (!svgString || typeof svgString !== "string") return null;
    const policy = createTrustedTypePolicy();
    let sanitizedSVG = svgString.trim();
    if (policy) {
      sanitizedSVG = policy.createHTML(sanitizedSVG);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitizedSVG, "image/svg+xml");
    const svgNode = doc.documentElement;
    if (!svgNode || svgNode.nodeName.toLowerCase() !== "svg" || svgNode.querySelector("parsererror")) {
      log(t("log.dom.svgParseError"), svgString);
      return null;
    }
    return document.importNode(svgNode, true);
  }
  var successIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>';
  var closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
  var notificationContainer = null;
  function getNotificationContainer() {
    if (!notificationContainer) {
      notificationContainer = document.createElement("div");
      notificationContainer.className = "tc-notification-container";
      uiContainer.appendChild(notificationContainer);
    }
    return notificationContainer;
  }
  function closeNotification(notification) {
    if (!notification || notification.classList.contains("tc-notification-fade-out")) {
      return;
    }
    notification.classList.add("tc-notification-fade-out");
    notification.addEventListener("animationend", () => {
      notification.remove();
      if (notificationContainer && notificationContainer.childElementCount === 0) {
        notificationContainer.remove();
        notificationContainer = null;
      }
    }, { once: true });
  }
  function createNotificationElement(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `tc-notification tc-notification-${type}`;
    const iconDiv = document.createElement("div");
    iconDiv.className = "tc-notification-icon";
    const iconSVGString = type === "success" ? successIcon : infoIcon;
    const iconElement = createSVGFromString(iconSVGString);
    if (iconElement) {
      iconDiv.appendChild(iconElement);
    }
    const contentDiv = document.createElement("div");
    contentDiv.className = "tc-notification-content";
    contentDiv.textContent = message;
    const closeDiv = document.createElement("div");
    closeDiv.className = "tc-notification-close";
    const closeIconElement = createSVGFromString(closeIcon);
    if (closeIconElement) {
      closeDiv.appendChild(closeIconElement);
    }
    notification.appendChild(iconDiv);
    notification.appendChild(contentDiv);
    notification.appendChild(closeDiv);
    closeDiv.addEventListener("click", () => {
      closeNotification(notification);
    });
    return notification;
  }
  function showNotification(message, { type = "info", duration = appConfig.ui.notificationDuration } = {}) {
    const container = getNotificationContainer();
    const notification = createNotificationElement(message, type);
    container.appendChild(notification);
    const timer = setTimeout(() => {
      closeNotification(notification);
    }, duration);
    const closeButton = notification.querySelector(".tc-notification-close");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        clearTimeout(timer);
      });
    }
  }
  function createIconTitle(iconSVG, text) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    if (iconSVG) {
      const iconWrapper = document.createElement("span");
      iconWrapper.style.display = "flex";
      iconWrapper.style.alignItems = "center";
      const svgElement = createSVGFromString(iconSVG);
      if (svgElement) {
        iconWrapper.appendChild(svgElement);
        container.appendChild(iconWrapper);
      }
    }
    const textNode = document.createElement("span");
    textNode.className = "icon-title-text";
    textNode.textContent = text;
    container.appendChild(textNode);
    return container;
  }
  var simpleTemplate = (template, values) => {
    if (!template) return "";
    return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
      return values.hasOwnProperty(key) ? values[key] : match;
    });
  };
  // src/shared/ui/mainModal/modalHeader.js
  var titleContainer;
  var scanCountDisplay;
  var currentScanState = { count: 0, type: null };
  function updateScanCountDisplay() {
    const { showScanCount } = loadSettings();
    if (!scanCountDisplay) return;
    if (showScanCount && currentScanState.count > 0 && currentScanState.type) {
      const key = currentScanState.type === "session" ? "results.scanCountSession" : "results.scanCountStatic";
      const template = t(key);
      scanCountDisplay.textContent = simpleTemplate(template, { count: currentScanState.count });
      scanCountDisplay.classList.add("is-visible");
    } else {
      scanCountDisplay.classList.remove("is-visible");
      setTimeout(() => {
        if (currentScanState.count === 0) {
          scanCountDisplay.textContent = "";
        }
      }, 300);
    }
  }
  function rerenderHeaderTexts() {
    if (titleContainer) {
      const titleElement = titleContainer.querySelector(".icon-title-text");
      if (titleElement) {
        titleElement.textContent = t("results.title");
      }
    }
    updateScanCountDisplay();
  }
  function populateModalHeader(modalHeader, closeCallback) {
    titleContainer = document.createElement("div");
    titleContainer.id = "main-modal-title-container";
    const newTitleElement = createIconTitle(summaryIcon, t("results.title"));
    titleContainer.appendChild(newTitleElement);
    const rightControlsContainer = document.createElement("div");
    rightControlsContainer.className = "header-right-controls";
    scanCountDisplay = document.createElement("span");
    scanCountDisplay.id = "scan-count-display";
    newTitleElement.appendChild(scanCountDisplay);
    const closeBtn = document.createElement("span");
    closeBtn.className = "tc-close-button text-extractor-modal-close";
    closeBtn.appendChild(createSVGFromString(closeIcon));
    rightControlsContainer.appendChild(closeBtn);
    modalHeader.appendChild(titleContainer);
    modalHeader.appendChild(rightControlsContainer);
    closeBtn.addEventListener("click", closeCallback);
    on("languageChanged", rerenderHeaderTexts);
    on("settingsSaved", updateScanCountDisplay);
  }
  function updateScanCount(count, type) {
    currentScanState = { count, type };
    updateScanCountDisplay();
  }
  var performQuickScan = (texts) => {
    return new Promise((resolve, reject) => {
      const { filterRules: filterRules2, enableDebugLogging } = loadSettings();
      const runFallback = () => {
        log(t("log.quickScan.switchToFallback"));
        showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
        try {
          const result = performScanInMainThread(texts, filterRules2, enableDebugLogging);
          updateScanCount(result.count, "static");
          resolve(result);
        } catch (fallbackError) {
          log(t("log.quickScan.fallbackFailed", { error: fallbackError.message }), "error");
          reject(fallbackError);
        }
      };
      try {
        log(t("log.quickScan.worker.starting"));
        const workerScript = `(() => {
  // src/shared/i18n/en.json
  var en_default = {
    common: {
      scan: "Scan",
      stop: "Stop",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      discovered: "Discovered:",
      confirm: "Confirm",
      cancel: "Cancel",
      export: "Export",
      reselect: "Reselect",
      stage: "Stage"
    },
    export: {
      exportAsTxt: "Export as TXT",
      exportAsJson: "Export as JSON",
      exportAsCsv: "Export as CSV",
      csv: {
        id: "ID",
        original: "Original",
        translation: "Translation"
      }
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      filters: {
        numbers: "Filter Numbers/Currency",
        chinese: "Filter Chinese-Only Text",
        contains_chinese: "Filter Text Containing Chinese",
        emoji_only: "Filter Emoji-Only Text",
        symbols: "Filter Symbol-Only Text",
        term: "Filter Specific Terms",
        single_letter: "Filter Single English Letters",
        repeating_chars: "Filter Repeating Characters",
        file_paths: "Filter File Paths",
        hex_color_codes: "Filter Hex Color Codes",
        email_addresses: "Filter Email Addresses",
        uuids: "Filter UUIDs",
        git_commit_hashes: "Filter Git Commit Hashes",
        website_urls: "Filter Website URLs",
        website_urls_title: "Filter Website URLs",
        shorthand_numbers: "Filter Shorthand Numbers",
        shorthand_numbers_title: "Filter Shorthand Numbers"
      },
      display: {
        show_fab: "Show Floating Button",
        fab_position: "Floating Button Position",
        fab_positions: {
          bottom_right: "Bottom Right",
          top_right: "Top Right",
          bottom_left: "Bottom Left",
          top_left: "Top Left"
        },
        show_line_numbers: "Show Line Numbers",
        show_statistics: "Show Statistics",
        enable_word_wrap: "Enable Word Wrap",
        text_truncation_limit: "Enable Text Truncation Limit",
        character_limit: "Character Limit",
        show_scan_count: "Enable Scan Count in Title"
      },
      advanced: {
        enable_debug_logging: "Enable Debug Logging"
      },
      panel: {
        title: "Settings Panel"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Session Scan",
      stagedCount: "Staged:",
      elementFinished: "Element scan finished, found {{count}} items.",
      startSession: "Start Dynamic Scan Session",
      stopSession: "Stop Dynamic Scan Session",
      finished: "Scan finished, found {{count}} items.",
      quickFinished: "Quick scan finished, found {{count}} items.",
      sessionStarted: "Session scan started.",
      sessionInProgress: "Scan in progress...",
      truncationWarning: "To maintain UI fluency, only a portion of the text is displayed here. The full content will be available upon export."
    },
    results: {
      title: "Extracted Text",
      scanCountSession: "Scanned {{count}} items",
      scanCountStatic: "Total {{count}} items scanned",
      totalCharacters: "Total Characters",
      totalLines: "Total Lines",
      noSummary: "No summary available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy.",
      contentCleared: "Content cleared.",
      noTextSelected: "No text selected.",
      scanFailed: "Scan failed.",
      elementScanStarted: "Element scan started.",
      cspWorkerWarning: "Switched to compatibility scan mode due to website security restrictions."
    },
    placeholders: {
      click: "Click ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " to start a new scan session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " to perform a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone."
    },
    tooltip: {
      summary: "View Summary",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan",
      element_scan: "Element Scan",
      disabled: {
        scan_in_progress: "Another scan is in progress"
      },
      filters: {
        title: "Content Filter Explanation",
        numbers: 'This rule filters out text that consists <strong>entirely</strong> of numbers, spaces, thousand separators (.), decimal points (,), and some currency symbols ($, \\u20AC, \\xA3, \\xA5).<br><br><strong>More Examples:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: 'This rule filters out text that consists <strong>entirely</strong> of Chinese characters and spaces, excluding any punctuation.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (will be filtered)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (will not be filtered)',
        contains_chinese: \`This rule filters out <strong>any</strong> text that contains at least one Chinese character, regardless of other characters.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D World" (will be filtered)<br>\\u2022 "Chapter 1" (will be filtered, as '\\u7B2C 1 \\u7AE0' contains '\\u7B2C' and '\\u7AE0')\`,
        emoji_only: 'This rule filters out text that consists <strong>entirely</strong> of one or more emoji characters and spaces.<br><br><strong>Examples:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: 'This rule filters out text that consists <strong>entirely</strong> of various punctuation and symbols.<br><br><strong>More Examples:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: 'This rule filters out common UI terms that typically do not require translation.<br><br><strong>More Examples:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: 'This rule filters out text consisting of a <strong>single</strong> English letter, case-insensitive.<br><br><strong>Examples:</strong><br>\\u2022 "A" (will be filtered)<br>\\u2022 "b" (will be filtered)<br>\\u2022 "AB" (will not be filtered)',
        repeating_chars: 'This rule filters out text composed of the <strong>same character</strong> repeating 2 or more times consecutively.<br><br><strong>Examples:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: 'This rule attempts to identify and filter out text that resembles an operating system file path and <strong>includes a file extension</strong>. It does not match URLs.<br><br><strong>More Examples:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: 'This rule filters out standard CSS hexadecimal color codes (3, 4, 6, or 8 digits, the latter including an alpha channel).<br><br><strong>Examples:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4-digit)<br>\\u2022 "#ff000080" (8-digit)',
        email_addresses: 'This rule filters out text that matches the standard format of an email address.<br><br><strong>Examples:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: 'This rule filters out Universally Unique Identifiers (UUIDs).<br><br><strong>Example:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: 'This rule filters out standard Git commit hashes (long or short).<br><br><strong>Examples:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: 'This rule filters out text that is a <strong>standalone URL</strong>. It is designed to be strict to avoid accidentally removing text that is not a link.<br><br><strong>More Examples:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: 'This rule filters out numbers that use <strong>common shorthand suffixes</strong> for thousands (k), millions (m), or billions (b), case-insensitive.<br><br><strong>More Examples:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "Display Settings Explanation",
        show_fab: "Control whether to display the <strong>Floating Action Button (FAB)</strong> in the bottom-right corner of webpages. This serves as the primary entry point for both static and dynamic text extraction. <br><br>If you disable this button, you can re-enable it via the settings panel in the Tampermonkey extension menu.",
        show_scan_count: "When enabled, the title bar of the results window will show a <strong>real-time count</strong> of the total text items found in the current scan. This is especially useful for monitoring the progress of a long-running <strong>Dynamic Scan</strong>.",
        show_line_numbers: "Displays line numbers to the left of the text area in the results window. This provides a <strong>precise reference point</strong> when you need to discuss or note a specific line of text.",
        show_statistics: "Displays <strong>real-time statistics</strong> about the extracted content in the status bar at the bottom of the results window, including <strong>total lines</strong> and <strong>total characters</strong>. This helps you quickly assess the volume of the content.",
        enable_word_wrap: "Controls how long lines of text are displayed in the results window.<br><br>\\u2022 <strong>Enabled:</strong> Long lines will wrap to fit the window's width.<br>\\u2022 <strong>Disabled:</strong> Long lines will remain on a single line, causing a horizontal scrollbar to appear.",
        text_truncation_limit: "This is a <strong>performance-saving</strong> feature. If the script extracts an <strong>extremely long single line of text</strong> (e.g., a base64 encoded image), it could cause the browser to <strong>lag or become unresponsive</strong>.<br><br>This setting truncates any single line exceeding the specified length to ensure the UI remains smooth. <strong>Note: This only affects the display; the exported file will still contain the full, untruncated content.</strong>"
      },
      advanced: {
        title: "Advanced Settings Explanation",
        enable_debug_logging: "When enabled, the script will output detailed internal status, execution steps, and error messages to the browser's <strong>Developer Tools Console</strong> (usually opened with F12). This is primarily for developers or users who need to submit detailed bug reports."
      }
    },
    log: {
      prefix: "[Text Extractor Script-Debug]",
      language: {
        switched: "Language switched to: {{lang}}",
        notFound: "Language '{{lang}}' not found, falling back to 'en'."
      },
      settings: {
        changed: "Setting '{{key}}' changed from '{{oldValue}}' to '{{newValue}}'",
        filterRuleChanged: {
          enabled: "Filter rule '{{key}}' has been enabled",
          disabled: "Filter rule '{{key}}' has been disabled"
        },
        panel: {
          opening: "Opening settings panel...",
          closing: "Closing settings panel...",
          saving: "Saving settings..."
        },
        parseError: "Error parsing saved settings:",
        invalidObject: "Attempted to save an invalid object for settings:"
      },
      textProcessor: {
        filtered: 'Text filtered: "{{text}}" (Reason: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[Quick Scan] Switching to main thread fallback.",
        fallbackFailed: "[Quick Scan] Main thread fallback failed: {{error}}",
        fallback: {
          starting: "[Quick Scan - Fallback] Starting processing in main thread...",
          completed: "[Quick Scan - Fallback] Processing complete, found {{count}} unique texts."
        },
        worker: {
          logPrefix: "[Quick Scan Worker]",
          starting: "[Quick Scan] Starting execution, attempting to use Web Worker...",
          completed: "[Quick Scan] Worker processing successful, received {{count}} texts.",
          scanComplete: "[Quick Scan Worker] Processing complete, found {{count}} unique texts. Sending back to main thread...",
          initFailed: "[Quick Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Quick Scan] Original error: {{error}}",
          sendingData: "[Quick Scan] Web Worker created, sending {{count}} texts for processing...",
          initSyncError: "[Quick Scan] Synchronous error during Worker initialization: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[Session Scan] Switching to main thread fallback.",
        domObserver: {
          stopped: "[Session Scan] Stopped listening for DOM changes."
        },
        fallback: {
          initialized: "[Session Scan - Fallback] Initialized.",
          cleared: "[Session Scan - Fallback] Data cleared."
        },
        worker: {
          logPrefix: "[Session Scan Worker]",
          starting: "Session Scan: Attempting to start Web Worker...",
          initFailed: "[Session Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Session Scan] Original error: {{error}}",
          initialized: "[Session Scan] Worker initialized successfully, sent {{count}} initial texts to start the session.",
          initSyncError: "[Session Scan] Synchronous error during Worker initialization: {{error}}",
          clearCommandSent: "[Session Scan] Clear command sent to worker."
        }
      },
      ui: {
        copyButton: {
          copied: "Copy button clicked, copied {{count}} characters.",
          nothingToCopy: "Copy button clicked, but there was no content to copy or the button was disabled."
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "User confirmed clearing session scan texts, invoking callback..."
          },
          quickScan: {
            confirmed: "User confirmed clearing quick scan texts."
          },
          cancelled: "User cancelled the clear operation."
        },
        modal: {
          opening: "Opening main modal...",
          closing: "Closing main modal...",
          scanFailed: "Static scan failed: {{error}}",
          clearContent: "Clear content button clicked."
        }
      },
      exporter: {
        buttonClicked: "Export button clicked, format: {{format}}.",
        csvError: "Error while parsing text and generating CSV: {{error}}",
        fileExported: "File exported: {{filename}}",
        noContent: "No content to export.",
        unknownFormat: "Unknown export format: {{format}}"
      },
      main: {
        requestingSessionScanData: "Requesting full data from session-scan mode...",
        exportingQuickScanData: "Exporting full data from quick-scan mode's memory...",
        inIframe: "Script is in an iframe, skipping initialization.",
        initializing: "Script initialization started...",
        initialSettingsLoaded: "Initial settings loaded:"
      },
      dom: {
        ttpCreationError: "Failed to create Trusted Type policy:",
        svgParseError: "Invalid or failed to parse SVG string:"
      },
      elementScan: {
        starting: "Element Scan started.",
        stopping: "Element Scan stopped.",
        listenersAdded: "Global event listeners for element scan added.",
        listenersRemoved: "Global event listeners for element scan removed.",
        stateReset: "Element scan state has been reset.",
        reselecting: "Returning to element reselection mode.",
        hovering: "Hovering over <{{tagName}}>.",
        escapePressed: "Escape key pressed, stopping element scan.",
        clickedEnteringAdjust: "Element <{{tagName}}> clicked, entering adjustment mode.",
        pathBuilt: "Element path built, depth: {{depth}}.",
        adjustingLevel: "Adjusting selection level to {{level}} ({{tagName}}).",
        confirmExtracting: "Selection confirmed, extracting text from <{{tagName}}>.",
        staged: "Element staged. Total staged: {{count}}.",
        confirmingStaged: "Confirming selection. Processing {{count}} staged elements.",
        extractedCount: "Extracted {{count}} raw text fragments from element.",
        confirmFailedNoTarget: "Confirmation failed: no target element selected.",
        rightClickExit: "Right-click detected, stopping element scan.",
        processingError: "An error occurred during text processing: {{error}}",
        scrollListenersAdded: "Added {{count}} scroll listeners to parent elements.",
        scrollListenersRemoved: "Removed all scroll listeners.",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "Element Scan Worker is starting...",
          sendingData: "Sending {{count}} text fragments to Element Scan Worker.",
          completed: "Element Scan Worker completed, found {{count}} unique texts.",
          initFailed: "Element Scan Worker initialization failed. The browser's CSP might be blocking data: URLs.",
          initSyncError: "Synchronous error during Element Scan Worker initialization: {{error}}",
          originalError: "Original worker error: {{error}}"
        },
        switchToFallback: "Switching to main thread fallback for Element Scan.",
        fallbackFailed: "Element Scan fallback mode failed: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "Element Scan UI: Creating highlight elements for the first time.",
        updatingHighlight: "Element Scan UI: Updating highlight for <{{tagName}}>.",
        creatingToolbar: "Element Scan UI: Creating adjustment toolbar.",
        toolbarPositioned: "Element Scan UI: Toolbar positioned.",
        sliderChanged: "Element Scan UI: Slider changed to level {{level}}",
        reselectClicked: "Element Scan UI: 'Reselect' button clicked.",
        stageClicked: "Element Scan UI: 'Stage' button clicked.",
        cancelClicked: "Element Scan UI: 'Cancel' button clicked.",
        confirmClicked: "Element Scan UI: 'Confirm' button clicked.",
        dragStarted: "Element Scan UI: Drag started.",
        dragEnded: "Element Scan UI: Drag ended.",
        cleaningHighlights: "Element Scan UI: Cleaning up highlight elements.",
        cleaningToolbar: "Element Scan UI: Cleaning up toolbar."
      },
      eventBus: {
        callbackError: "Error in callback for event '{{eventName}}':"
      },
      trustedTypes: {
        workerPolicyError: "Failed to create Trusted Types worker policy:",
        htmlPolicyError: "Failed to create Trusted Types HTML policy:",
        defaultWorkerPolicyWarning: "Trusted Types default policy failed for worker URL, falling back to raw URL.",
        defaultHtmlPolicyWarning: "Trusted Types default policy failed for HTML, falling back to raw string."
      }
    },
    tutorial: {
      elementScanTitle: "Element Scan Guide",
      elementScan: '<p class="tutorial-content">This is a placeholder for the element scan tutorial. Rich text is supported.</p>'
    }
  };
  // src/shared/i18n/zh-CN.json
  var zh_CN_default = {
    common: {
      scan: "\\u626B\\u63CF",
      stop: "\\u505C\\u6B62",
      resume: "\\u6062\\u590D",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u590D\\u5236",
      save: "\\u4FDD\\u5B58",
      discovered: "\\u5DF2\\u53D1\\u73B0:",
      confirm: "\\u786E\\u8BA4",
      cancel: "\\u53D6\\u6D88",
      export: "\\u5BFC\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9009\\u62E9",
      stage: "\\u6682\\u5B58"
    },
    export: {
      exportAsTxt: "\\u5BFC\\u51FA\\u4E3A TXT",
      exportAsJson: "\\u5BFC\\u51FA\\u4E3A JSON",
      exportAsCsv: "\\u5BFC\\u51FA\\u4E3A CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8BD1\\u6587"
      }
    },
    settings: {
      title: "\\u8BBE\\u7F6E",
      theme: "\\u4E3B\\u9898",
      language: "\\u8BED\\u8A00",
      relatedSettings: "\\u76F8\\u5173\\u8BBE\\u7F6E",
      filterRules: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u89C4\\u5219",
      filters: {
        numbers: "\\u8FC7\\u6EE4\\u6570\\u5B57/\\u8D27\\u5E01",
        chinese: "\\u8FC7\\u6EE4\\u7EAF\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u8FC7\\u6EE4\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u8FC7\\u6EE4\\u7EAF\\u8868\\u60C5\\u7B26\\u53F7\\u6587\\u672C",
        symbols: "\\u8FC7\\u6EE4\\u7EAF\\u7B26\\u53F7\\u6587\\u672C",
        term: "\\u8FC7\\u6EE4\\u7279\\u5B9A\\u672F\\u8BED",
        single_letter: "\\u8FC7\\u6EE4\\u5355\\u4E2A\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u8FC7\\u6EE4\\u91CD\\u590D\\u5B57\\u7B26",
        file_paths: "\\u8FC7\\u6EE4\\u6587\\u4EF6\\u8DEF\\u5F84",
        hex_color_codes: "\\u8FC7\\u6EE4\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801",
        email_addresses: "\\u8FC7\\u6EE4\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740",
        uuids: "\\u8FC7\\u6EE4 UUID",
        git_commit_hashes: "\\u8FC7\\u6EE4 Git \\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C",
        website_urls: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        website_urls_title: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        shorthand_numbers: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57",
        shorthand_numbers_title: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57"
      },
      display: {
        show_fab: "\\u663E\\u793A\\u60AC\\u6D6E\\u6309\\u94AE",
        fab_position: "\\u60AC\\u6D6E\\u6309\\u94AE\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u53F3\\u4E0B\\u89D2",
          top_right: "\\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u663E\\u793A\\u884C\\u53F7",
        show_statistics: "\\u663E\\u793A\\u7EDF\\u8BA1\\u4FE1\\u606F",
        enable_word_wrap: "\\u542F\\u7528\\u81EA\\u52A8\\u6362\\u884C",
        text_truncation_limit: "\\u542F\\u7528\\u6587\\u672C\\u622A\\u65AD\\u9650\\u5236",
        character_limit: "\\u5B57\\u7B26\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6807\\u9898\\u4E2D\\u542F\\u7528\\u626B\\u63CF\\u8BA1\\u6570"
      },
      advanced: {
        enable_debug_logging: "\\u542F\\u7528\\u8C03\\u8BD5\\u65E5\\u5FD7\\u8BB0\\u5F55"
      },
      panel: {
        title: "\\u8BBE\\u7F6E\\u9762\\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6D45\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u968F\\u7CFB\\u7EDF"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u626B\\u63CF",
      session: "\\u4F1A\\u8BDD\\u626B\\u63CF",
      stagedCount: "\\u5DF2\\u6682\\u5B58:",
      elementFinished: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      startSession: "\\u5F00\\u59CB\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      stopSession: "\\u505C\\u6B62\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      finished: "\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      sessionStarted: "\\u4F1A\\u8BDD\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      sessionInProgress: "\\u626B\\u63CF\\u8FDB\\u884C\\u4E2D...",
      truncationWarning: "\\u4E3A\\u4FDD\\u6301\\u754C\\u9762\\u6D41\\u7545\\uFF0C\\u6B64\\u5904\\u4EC5\\u663E\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u5BFC\\u51FA\\u540E\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u5185\\u5BB9\\u3002"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      scanCountSession: "\\u5DF2\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      scanCountStatic: "\\u5171\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      totalCharacters: "\\u603B\\u5B57\\u7B26\\u6570",
      totalLines: "\\u603B\\u884C\\u6570",
      noSummary: "\\u65E0\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u7B26"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u590D\\u5236\\u5230\\u526A\\u8D34\\u677F\\uFF01",
      settingsSaved: "\\u8BBE\\u7F6E\\u5DF2\\u4FDD\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u6001\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6CA1\\u6709\\u53EF\\u590D\\u5236\\u7684\\u5185\\u5BB9\\u3002",
      contentCleared: "\\u5185\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u626B\\u63CF\\u5931\\u8D25\\u3002",
      elementScanStarted: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      cspWorkerWarning: "\\u56E0\\u7F51\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u6362\\u81F3\\u517C\\u5BB9\\u626B\\u63CF\\u6A21\\u5F0F\\u3002"
    },
    placeholders: {
      click: "\\u70B9\\u51FB ",
      dynamicScan: "[\\u52A8\\u6001\\u626B\\u63CF]",
      startNewScanSession: " \\u5F00\\u59CB\\u65B0\\u7684\\u626B\\u63CF\\u4F1A\\u8BDD",
      staticScan: "[\\u9759\\u6001\\u626B\\u63CF]",
      performOneTimeScan: " \\u6267\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u786E\\u5B9A\\u8981\\u6E05\\u9664\\u5185\\u5BB9\\u5417\\uFF1F\\u6B64\\u64CD\\u4F5C\\u65E0\\u6CD5\\u64A4\\u9500\\u3002"
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      dynamic_scan: "\\u52A8\\u6001\\u626B\\u63CF",
      static_scan: "\\u9759\\u6001\\u626B\\u63CF",
      element_scan: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF",
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9879\\u626B\\u63CF\\u6B63\\u5728\\u8FDB\\u884C\\u4E2D"
      },
      filters: {
        title: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u5668\\u8BF4\\u660E",
        numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6570\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6570\\u70B9(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8D27\\u5E01\\u7B26\\u53F7($, \\u20AC, \\xA3, \\xA5)\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6C49\\u5B57\\u548C\\u7A7A\\u683C\\u7EC4\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6807\\u70B9\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        contains_chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u4E2A\\u6C49\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u65E0\\u8BBA\\u5176\\u4ED6\\u5B57\\u7B26\\u662F\\u4EC0\\u4E48\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C06\\u88AB\\u8FC7\\u6EE4)',
        emoji_only: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u4E2A\\u6216\\u591A\\u4E2A\\u8868\\u60C5\\u7B26\\u53F7\\u53CA\\u7A7A\\u683C\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u79CD\\u6807\\u70B9\\u548C\\u7B26\\u53F7\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8BD1\\u7684\\u5E38\\u89C1UI\\u672F\\u8BED\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u5355\\u4E2A</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7EC4\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "A" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "b" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "AB" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        repeating_chars: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u540C\\u4E00\\u4E2A\\u5B57\\u7B26</strong>\\u8FDE\\u7EED\\u91CD\\u590D2\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u89C4\\u5219\\u5C1D\\u8BD5\\u8BC6\\u522B\\u5E76\\u8FC7\\u6EE4\\u6389\\u7C7B\\u4F3C\\u64CD\\u4F5C\\u7CFB\\u7EDF\\u6587\\u4EF6\\u8DEF\\u5F84\\u4E14<strong>\\u5305\\u542B\\u6587\\u4EF6\\u6269\\u5C55\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7F51\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684CSS\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u540E\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7B26\\u5408\\u6807\\u51C6\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u7528\\u552F\\u4E00\\u6807\\u8BC6\\u7B26 (UUID)\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684Git\\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C\\uFF08\\u957F\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u72EC\\u7ACB\\u7684\\u7F51\\u5740</strong>\\u3002\\u5B83\\u8BBE\\u8BA1\\u5F97\\u6BD4\\u8F83\\u4E25\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u94FE\\u63A5\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u89C1\\u901F\\u8BB0\\u540E\\u7F00</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u4E07(m)\\u6216\\u5341\\u4EBF(b)\\u7684\\u6570\\u5B57\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u663E\\u793A\\u8BBE\\u7F6E\\u8BF4\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7F51\\u9875\\u53F3\\u4E0B\\u89D2\\u663E\\u793A<strong>\\u60AC\\u6D6E\\u64CD\\u4F5C\\u6309\\u94AE(FAB)</strong>\\u3002\\u8FD9\\u662F\\u8FDB\\u884C\\u9759\\u6001\\u548C\\u52A8\\u6001\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u94AE\\uFF0C\\u53EF\\u4EE5\\u901A\\u8FC7\\u6CB9\\u7334\\u6269\\u5C55\\u83DC\\u5355\\u4E2D\\u7684\\u8BBE\\u7F6E\\u9762\\u677F\\u91CD\\u65B0\\u542F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u542F\\u7528\\u540E\\uFF0C\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6807\\u9898\\u680F\\u5C06<strong>\\u5B9E\\u65F6\\u663E\\u793A</strong>\\u5F53\\u524D\\u626B\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u603B\\u6587\\u672C\\u9879\\u76EE\\u6570\\u3002\\u8FD9\\u5BF9\\u4E8E\\u76D1\\u63A7\\u957F\\u65F6\\u95F4\\u8FD0\\u884C\\u7684<strong>\\u52A8\\u6001\\u626B\\u63CF</strong>\\u7684\\u8FDB\\u5EA6\\u7279\\u522B\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6587\\u672C\\u533A\\u57DF\\u5DE6\\u4FA7\\u663E\\u793A\\u884C\\u53F7\\u3002\\u5F53\\u60A8\\u9700\\u8981\\u8BA8\\u8BBA\\u6216\\u8BB0\\u5F55\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u65F6\\uFF0C\\u8FD9\\u63D0\\u4F9B\\u4E86\\u4E00\\u4E2A<strong>\\u7CBE\\u786E\\u7684\\u53C2\\u8003\\u70B9</strong>\\u3002",
        show_statistics: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u5E95\\u90E8\\u7684\\u72B6\\u6001\\u680F\\u4E2D\\u663E\\u793A\\u6709\\u5173\\u63D0\\u53D6\\u5185\\u5BB9\\u7684<strong>\\u5B9E\\u65F6\\u7EDF\\u8BA1\\u6570\\u636E</strong>\\uFF0C\\u5305\\u62EC<strong>\\u603B\\u884C\\u6570</strong>\\u548C<strong>\\u603B\\u5B57\\u7B26\\u6570</strong>\\u3002\\u8FD9\\u6709\\u52A9\\u4E8E\\u60A8\\u5FEB\\u901F\\u8BC4\\u4F30\\u5185\\u5BB9\\u7684\\u4F53\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7ED3\\u679C\\u7A97\\u53E3\\u4E2D\\u957F\\u6587\\u672C\\u884C\\u7684\\u663E\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u542F\\u7528:</strong> \\u957F\\u884C\\u5C06\\u81EA\\u52A8\\u6362\\u884C\\u4EE5\\u9002\\u5E94\\u7A97\\u53E3\\u5BBD\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u957F\\u884C\\u5C06\\u4FDD\\u6301\\u5728\\u5355\\u884C\\uFF0C\\u5E76\\u51FA\\u73B0\\u6C34\\u5E73\\u6EDA\\u52A8\\u6761\\u3002",
        text_truncation_limit: "\\u8FD9\\u662F\\u4E00\\u4E2A<strong>\\u6027\\u80FD\\u4F18\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u811A\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6781\\u957F\\u7684\\u5355\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7F16\\u7801\\u7684\\u56FE\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u4F1A\\u5BFC\\u81F4\\u6D4F\\u89C8\\u5668<strong>\\u5361\\u987F\\u6216\\u65E0\\u54CD\\u5E94</strong>\\u3002<br><br>\\u6B64\\u8BBE\\u7F6E\\u4F1A\\u622A\\u65AD\\u4EFB\\u4F55\\u8D85\\u8FC7\\u6307\\u5B9A\\u957F\\u5EA6\\u7684\\u5355\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u786E\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u7545\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u8FD9\\u4EC5\\u5F71\\u54CD\\u663E\\u793A\\uFF1B\\u5BFC\\u51FA\\u7684\\u6587\\u4EF6\\u4ECD\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65AD\\u7684\\u5185\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9AD8\\u7EA7\\u8BBE\\u7F6E\\u8BF4\\u660E",
        enable_debug_logging: "\\u542F\\u7528\\u540E\\uFF0C\\u811A\\u672C\\u4F1A\\u5C06\\u8BE6\\u7EC6\\u7684\\u5185\\u90E8\\u72B6\\u6001\\u3001\\u6267\\u884C\\u6B65\\u9AA4\\u548C\\u9519\\u8BEF\\u4FE1\\u606F\\u8F93\\u51FA\\u5230\\u6D4F\\u89C8\\u5668\\u7684<strong>\\u5F00\\u53D1\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u6253\\u5F00\\uFF09\\u3002\\u8FD9\\u4E3B\\u8981\\u4F9B\\u5F00\\u53D1\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8BE6\\u7EC6\\u9519\\u8BEF\\u62A5\\u544A\\u7684\\u7528\\u6237\\u4F7F\\u7528\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u811A\\u672C-\\u8C03\\u8BD5]",
      language: {
        switched: "\\u8BED\\u8A00\\u5DF2\\u5207\\u6362\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8BED\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8BBE\\u7F6E '{{key}}' \\u5DF2\\u4ECE '{{oldValue}}' \\u66F4\\u6539\\u4E3A '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u542F\\u7528",
          disabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u8BBE\\u7F6E\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u8BBE\\u7F6E\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u4FDD\\u5B58\\u8BBE\\u7F6E..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u4FDD\\u5B58\\u7684\\u8BBE\\u7F6E\\u65F6\\u51FA\\u9519\\uFF1A",
        invalidObject: "\\u8BD5\\u56FE\\u4E3A\\u8BBE\\u7F6E\\u4FDD\\u5B58\\u4E00\\u4E2A\\u65E0\\u6548\\u5BF9\\u8C61\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u8FC7\\u6EE4: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u6B63\\u5728\\u4E3B\\u7EBF\\u7A0B\\u4E2D\\u5F00\\u59CB\\u5904\\u7406...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u626B\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u5F00\\u59CB\\u6267\\u884C\\uFF0C\\u5C1D\\u8BD5\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u5904\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u6761\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u626B\\u63CF Worker] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002\\u6B63\\u5728\\u53D1\\u56DE\\u4E3B\\u7EBF\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u626B\\u63CF] Web Worker \\u5DF2\\u521B\\u5EFA\\uFF0C\\u6B63\\u5728\\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u8FDB\\u884C\\u5904\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        domObserver: {
          stopped: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u5DF2\\u505C\\u6B62\\u76D1\\u542C DOM \\u53D8\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u4F1A\\u8BDD\\u626B\\u63CF - \\u5907\\u9009] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u4F1A\\u8BDD\\u626B\\u63CF - \\u5907\\u9009] \\u6570\\u636E\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u4F1A\\u8BDD\\u626B\\u63CF Worker]",
          starting: "\\u4F1A\\u8BDD\\u626B\\u63CF\\uFF1A\\u6B63\\u5728\\u5C1D\\u8BD5\\u542F\\u52A8 Web Worker...",
          initFailed: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          initialized: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u53D1\\u9001 {{count}} \\u6761\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u5F00\\u59CB\\u4F1A\\u8BDD\\u3002",
          initSyncError: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          clearCommandSent: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u53D1\\u9001\\u81F3 worker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u590D\\u5236\\u4E86 {{count}} \\u4E2A\\u5B57\\u7B26\\u3002",
          nothingToCopy: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u4F46\\u6CA1\\u6709\\u5185\\u5BB9\\u53EF\\u590D\\u5236\\u6216\\u6309\\u94AE\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u4F1A\\u8BDD\\u626B\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8C03\\u7528\\u56DE\\u8C03..."
          },
          quickScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u5FEB\\u901F\\u626B\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u7528\\u6237\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u4E3B\\u6A21\\u6001\\u6846...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u4E3B\\u6A21\\u6001\\u6846...",
          scanFailed: "\\u9759\\u6001\\u626B\\u63CF\\u5931\\u8D25: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5185\\u5BB9\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\u3002"
        }
      },
      exporter: {
        buttonClicked: "\\u5BFC\\u51FA\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u5E76\\u751F\\u6210CSV\\u65F6\\u51FA\\u9519: {{error}}",
        fileExported: "\\u6587\\u4EF6\\u5DF2\\u5BFC\\u51FA: {{filename}}",
        noContent: "\\u65E0\\u5185\\u5BB9\\u53EF\\u5BFC\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u5BFC\\u51FA\\u683C\\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8BF7\\u6C42\\u4F1A\\u8BDD\\u626B\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        exportingQuickScanData: "\\u6B63\\u5728\\u5BFC\\u51FA\\u5FEB\\u901F\\u626B\\u63CF\\u6A21\\u5F0F\\u5185\\u5B58\\u4E2D\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        inIframe: "\\u811A\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u8FC7\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u811A\\u672C\\u521D\\u59CB\\u5316\\u5F00\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8BBE\\u7F6E\\u5DF2\\u52A0\\u8F7D:"
      },
      dom: {
        ttpCreationError: "\\u521B\\u5EFA Trusted Type \\u7B56\\u7565\\u5931\\u8D25:",
        svgParseError: "SVG \\u5B57\\u7B26\\u4E32\\u65E0\\u6548\\u6216\\u89E3\\u6790\\u5931\\u8D25:"
      },
      elementScan: {
        starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
        stopping: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6DFB\\u52A0\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u79FB\\u9664\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        stateReset: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u72B6\\u6001\\u5DF2\\u91CD\\u7F6E\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9009\\u62E9\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u60AC\\u505C\\u4E8E <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u952E\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u8FDB\\u5165\\u8C03\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C42\\u7EA7\\u8DEF\\u5F84\\u5DF2\\u6784\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u4E3A\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8C03\\u6574\\u9009\\u62E9\\u5C42\\u7EA7\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9009\\u62E9\\u5DF2\\u786E\\u8BA4\\uFF0C\\u6B63\\u5728\\u4ECE <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u6682\\u5B58\\u3002\\u603B\\u6570\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u786E\\u8BA4\\u9009\\u62E9\\u3002\\u6B63\\u5728\\u5904\\u7406 {{count}} \\u4E2A\\u5DF2\\u6682\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u4ECE\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u6761\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u786E\\u8BA4\\u5931\\u8D25\\uFF1A\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u76EE\\u6807\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u68C0\\u6D4B\\u5230\\u53F3\\u952E\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u5904\\u7406\\u8FC7\\u7A0B\\u4E2D\\u53D1\\u751F\\u9519\\u8BEF: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u4E3A {{count}} \\u4E2A\\u7236\\u5143\\u7D20\\u6DFB\\u52A0\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u6B63\\u5728\\u542F\\u52A8...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002",
          initFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u6D4F\\u89C8\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u9519\\u8BEF: {{error}}"
        },
        switchToFallback: "\\u6B63\\u5728\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u9996\\u6B21\\u521B\\u5EFA\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u4E3A <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u521B\\u5EFA\\u8C03\\u6574\\u5DE5\\u5177\\u680F\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u680F\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6ED1\\u5757\\u5C42\\u7EA7\\u53D8\\u4E3A {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u91CD\\u65B0\\u9009\\u62E9\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        stageClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u6682\\u5B58\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u53D6\\u6D88\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u786E\\u8BA4\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        dragStarted: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u5F00\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u7ED3\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u680F\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u8C03\\u51FD\\u6570\\u51FA\\u9519:"
      },
      trustedTypes: {
        workerPolicyError: "\\u521B\\u5EFA Trusted Types worker \\u7B56\\u7565\\u5931\\u8D25:",
        htmlPolicyError: "\\u521B\\u5EFA Trusted Types HTML \\u7B56\\u7565\\u5931\\u8D25:",
        defaultWorkerPolicyWarning: "\\u7528\\u4E8E worker URL \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u4E8E HTML \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u7B26\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B",
      elementScan: '<p class="tutorial-content">\\u8FD9\\u662F\\u4E00\\u4E2A\\u7528\\u4E8E\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B\\u7684\\u5360\\u4F4D\\u7B26\\u3002\\u652F\\u6301\\u5BCC\\u6587\\u672C\\u683C\\u5F0F\\u3002</p>'
    }
  };
  // src/shared/i18n/zh-TW.json
  var zh_TW_default = {
    common: {
      scan: "\\u6383\\u63CF",
      stop: "\\u505C\\u6B62",
      resume: "\\u6062\\u5FA9",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u8907\\u88FD",
      save: "\\u5132\\u5B58",
      discovered: "\\u5DF2\\u767C\\u73FE:",
      confirm: "\\u78BA\\u8A8D",
      cancel: "\\u53D6\\u6D88",
      export: "\\u532F\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9078\\u64C7",
      stage: "\\u66AB\\u5B58"
    },
    export: {
      exportAsTxt: "\\u532F\\u51FA\\u70BA TXT",
      exportAsJson: "\\u532F\\u51FA\\u70BA JSON",
      exportAsCsv: "\\u532F\\u51FA\\u70BA CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8B6F\\u6587"
      }
    },
    settings: {
      title: "\\u8A2D\\u5B9A",
      theme: "\\u4E3B\\u984C",
      language: "\\u8A9E\\u8A00",
      relatedSettings: "\\u76F8\\u95DC\\u8A2D\\u5B9A",
      filterRules: "\\u5167\\u5BB9\\u904E\\u6FFE\\u898F\\u5247",
      filters: {
        numbers: "\\u904E\\u6FFE\\u6578\\u5B57/\\u8CA8\\u5E63",
        chinese: "\\u904E\\u6FFE\\u7D14\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u904E\\u6FFE\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u904E\\u6FFE\\u7D14\\u8868\\u60C5\\u7B26\\u865F\\u6587\\u672C",
        symbols: "\\u904E\\u6FFE\\u7D14\\u7B26\\u865F\\u6587\\u672C",
        term: "\\u904E\\u6FFE\\u7279\\u5B9A\\u8853\\u8A9E",
        single_letter: "\\u904E\\u6FFE\\u55AE\\u500B\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u904E\\u6FFE\\u91CD\\u8907\\u5B57\\u5143",
        file_paths: "\\u904E\\u6FFE\\u6A94\\u6848\\u8DEF\\u5F91",
        hex_color_codes: "\\u904E\\u6FFE\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC",
        email_addresses: "\\u904E\\u6FFE\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740",
        uuids: "\\u904E\\u6FFE UUID",
        git_commit_hashes: "\\u904E\\u6FFE Git \\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C",
        website_urls: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        website_urls_title: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        shorthand_numbers: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57",
        shorthand_numbers_title: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57"
      },
      display: {
        show_fab: "\\u986F\\u793A\\u61F8\\u6D6E\\u6309\\u9215",
        fab_position: "\\u61F8\\u6D6E\\u6309\\u9215\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u53F3\\u4E0B\\u89D2",
          top_right: "\\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u986F\\u793A\\u884C\\u865F",
        show_statistics: "\\u986F\\u793A\\u7D71\\u8A08\\u8CC7\\u8A0A",
        enable_word_wrap: "\\u555F\\u7528\\u81EA\\u52D5\\u63DB\\u884C",
        text_truncation_limit: "\\u555F\\u7528\\u6587\\u672C\\u622A\\u65B7\\u9650\\u5236",
        character_limit: "\\u5B57\\u5143\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6A19\\u984C\\u4E2D\\u555F\\u7528\\u6383\\u63CF\\u8A08\\u6578"
      },
      advanced: {
        enable_debug_logging: "\\u555F\\u7528\\u5075\\u932F\\u65E5\\u8A8C\\u8A18\\u9304"
      },
      panel: {
        title: "\\u8A2D\\u5B9A\\u9762\\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6DFA\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u96A8\\u7CFB\\u7D71"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u6383\\u63CF",
      session: "\\u6703\\u8A71\\u6383\\u63CF",
      stagedCount: "\\u5DF2\\u66AB\\u5B58:",
      elementFinished: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      startSession: "\\u958B\\u59CB\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      stopSession: "\\u505C\\u6B62\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      finished: "\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      sessionStarted: "\\u6703\\u8A71\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      sessionInProgress: "\\u6383\\u63CF\\u9032\\u884C\\u4E2D...",
      truncationWarning: "\\u70BA\\u4FDD\\u6301\\u4ECB\\u9762\\u6D41\\u66A2\\uFF0C\\u6B64\\u8655\\u50C5\\u986F\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u532F\\u51FA\\u5F8C\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u5167\\u5BB9\\u3002"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      scanCountSession: "\\u5DF2\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      scanCountStatic: "\\u5171\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      totalCharacters: "\\u7E3D\\u5B57\\u5143\\u6578",
      totalLines: "\\u7E3D\\u884C\\u6578",
      noSummary: "\\u7121\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u5143"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u8907\\u88FD\\u5230\\u526A\\u8CBC\\u7C3F\\uFF01",
      settingsSaved: "\\u8A2D\\u5B9A\\u5DF2\\u5132\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u614B\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6C92\\u6709\\u53EF\\u8907\\u88FD\\u7684\\u5167\\u5BB9\\u3002",
      contentCleared: "\\u5167\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u6383\\u63CF\\u5931\\u6557\\u3002",
      elementScanStarted: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      cspWorkerWarning: "\\u56E0\\u7DB2\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u63DB\\u81F3\\u76F8\\u5BB9\\u6383\\u63CF\\u6A21\\u5F0F\\u3002"
    },
    placeholders: {
      click: "\\u9EDE\\u64CA ",
      dynamicScan: "[\\u52D5\\u614B\\u6383\\u63CF]",
      startNewScanSession: " \\u958B\\u59CB\\u65B0\\u7684\\u6383\\u63CF\\u6703\\u8A71",
      staticScan: "[\\u975C\\u614B\\u6383\\u63CF]",
      performOneTimeScan: " \\u57F7\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u78BA\\u5B9A\\u8981\\u6E05\\u9664\\u5167\\u5BB9\\u55CE\\uFF1F\\u6B64\\u64CD\\u4F5C\\u7121\\u6CD5\\u64A4\\u92B7\\u3002"
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      dynamic_scan: "\\u52D5\\u614B\\u6383\\u63CF",
      static_scan: "\\u975C\\u614B\\u6383\\u63CF",
      element_scan: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF",
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9805\\u6383\\u63CF\\u6B63\\u5728\\u9032\\u884C\\u4E2D"
      },
      filters: {
        title: "\\u5167\\u5BB9\\u904E\\u6FFE\\u5668\\u8AAA\\u660E",
        numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6578\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6578\\u9EDE(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8CA8\\u5E63\\u7B26\\u865F($, \\u20AC, \\xA3, \\xA5)\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6F22\\u5B57\\u548C\\u7A7A\\u683C\\u7D44\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6A19\\u9EDE\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        contains_chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u500B\\u6F22\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u7121\\u8AD6\\u5176\\u4ED6\\u5B57\\u5143\\u662F\\u4EC0\\u9EBC\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C07\\u88AB\\u904E\\u6FFE)',
        emoji_only: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u500B\\u6216\\u591A\\u500B\\u8868\\u60C5\\u7B26\\u865F\\u53CA\\u7A7A\\u683C\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u7A2E\\u6A19\\u9EDE\\u548C\\u7B26\\u865F\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8B6F\\u7684\\u5E38\\u898BUI\\u8853\\u8A9E\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u55AE\\u500B</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7D44\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "A" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "b" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "AB" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        repeating_chars: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u540C\\u4E00\\u500B\\u5B57\\u5143</strong>\\u9023\\u7E8C\\u91CD\\u89072\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u898F\\u5247\\u5617\\u8A66\\u8B58\\u5225\\u4E26\\u904E\\u6FFE\\u6389\\u985E\\u4F3C\\u4F5C\\u696D\\u7CFB\\u7D71\\u6A94\\u6848\\u8DEF\\u5F91\\u4E14<strong>\\u5305\\u542B\\u6A94\\u6848\\u526F\\u6A94\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7DB2\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684CSS\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u5F8C\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7B26\\u5408\\u6A19\\u6E96\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u7528\\u552F\\u4E00\\u8B58\\u5225\\u78BC (UUID)\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684Git\\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C\\uFF08\\u9577\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u7368\\u7ACB\\u7684\\u7DB2\\u5740</strong>\\u3002\\u5B83\\u8A2D\\u8A08\\u5F97\\u6BD4\\u8F03\\u56B4\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u9023\\u7D50\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u898B\\u901F\\u8A18\\u5F8C\\u7DB4</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u842C(m)\\u6216\\u5341\\u5104(b)\\u7684\\u6578\\u5B57\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u986F\\u793A\\u8A2D\\u5B9A\\u8AAA\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7DB2\\u9801\\u53F3\\u4E0B\\u89D2\\u986F\\u793A<strong>\\u61F8\\u6D6E\\u64CD\\u4F5C\\u6309\\u9215(FAB)</strong>\\u3002\\u9019\\u662F\\u9032\\u884C\\u975C\\u614B\\u548C\\u52D5\\u614B\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u9215\\uFF0C\\u53EF\\u4EE5\\u900F\\u904E\\u6CB9\\u7334\\u64F4\\u5145\\u5957\\u4EF6\\u9078\\u55AE\\u4E2D\\u7684\\u8A2D\\u5B9A\\u9762\\u677F\\u91CD\\u65B0\\u555F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u555F\\u7528\\u5F8C\\uFF0C\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6A19\\u984C\\u5217\\u5C07<strong>\\u5373\\u6642\\u986F\\u793A</strong>\\u76EE\\u524D\\u6383\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u7E3D\\u6587\\u672C\\u9805\\u76EE\\u6578\\u3002\\u9019\\u5C0D\\u65BC\\u76E3\\u63A7\\u9577\\u6642\\u9593\\u57F7\\u884C\\u7684<strong>\\u52D5\\u614B\\u6383\\u63CF</strong>\\u7684\\u9032\\u5EA6\\u7279\\u5225\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6587\\u672C\\u5340\\u57DF\\u5DE6\\u5074\\u986F\\u793A\\u884C\\u865F\\u3002\\u7576\\u60A8\\u9700\\u8981\\u8A0E\\u8AD6\\u6216\\u8A18\\u9304\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u6642\\uFF0C\\u9019\\u63D0\\u4F9B\\u4E86\\u4E00\\u500B<strong>\\u7CBE\\u78BA\\u7684\\u53C3\\u8003\\u9EDE</strong>\\u3002",
        show_statistics: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u5E95\\u90E8\\u7684\\u72C0\\u614B\\u5217\\u4E2D\\u986F\\u793A\\u6709\\u95DC\\u63D0\\u53D6\\u5167\\u5BB9\\u7684<strong>\\u5373\\u6642\\u7D71\\u8A08\\u6578\\u64DA</strong>\\uFF0C\\u5305\\u62EC<strong>\\u7E3D\\u884C\\u6578</strong>\\u548C<strong>\\u7E3D\\u5B57\\u5143\\u6578</strong>\\u3002\\u9019\\u6709\\u52A9\\u65BC\\u60A8\\u5FEB\\u901F\\u8A55\\u4F30\\u5167\\u5BB9\\u7684\\u9AD4\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7D50\\u679C\\u8996\\u7A97\\u4E2D\\u9577\\u6587\\u672C\\u884C\\u7684\\u986F\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u555F\\u7528:</strong> \\u9577\\u884C\\u5C07\\u81EA\\u52D5\\u63DB\\u884C\\u4EE5\\u9069\\u61C9\\u8996\\u7A97\\u5BEC\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u9577\\u884C\\u5C07\\u4FDD\\u6301\\u5728\\u55AE\\u884C\\uFF0C\\u4E26\\u51FA\\u73FE\\u6C34\\u5E73\\u6372\\u8EF8\\u3002",
        text_truncation_limit: "\\u9019\\u662F\\u4E00\\u500B<strong>\\u6548\\u80FD\\u512A\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u8173\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6975\\u9577\\u7684\\u55AE\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7DE8\\u78BC\\u7684\\u5716\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u6703\\u5C0E\\u81F4\\u700F\\u89BD\\u5668<strong>\\u5361\\u9813\\u6216\\u7121\\u56DE\\u61C9</strong>\\u3002<br><br>\\u6B64\\u8A2D\\u5B9A\\u6703\\u622A\\u65B7\\u4EFB\\u4F55\\u8D85\\u904E\\u6307\\u5B9A\\u9577\\u5EA6\\u7684\\u55AE\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u78BA\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u66A2\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u9019\\u50C5\\u5F71\\u97FF\\u986F\\u793A\\uFF1B\\u532F\\u51FA\\u7684\\u6A94\\u6848\\u4ECD\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65B7\\u7684\\u5167\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9032\\u968E\\u8A2D\\u5B9A\\u8AAA\\u660E",
        enable_debug_logging: "\\u555F\\u7528\\u5F8C\\uFF0C\\u8173\\u672C\\u6703\\u5C07\\u8A73\\u7D30\\u7684\\u5167\\u90E8\\u72C0\\u614B\\u3001\\u57F7\\u884C\\u6B65\\u9A5F\\u548C\\u932F\\u8AA4\\u8A0A\\u606F\\u8F38\\u51FA\\u5230\\u700F\\u89BD\\u5668\\u7684<strong>\\u958B\\u767C\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u958B\\u555F\\uFF09\\u3002\\u9019\\u4E3B\\u8981\\u4F9B\\u958B\\u767C\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8A73\\u7D30\\u932F\\u8AA4\\u5831\\u544A\\u7684\\u4F7F\\u7528\\u8005\\u4F7F\\u7528\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u8173\\u672C-\\u5075\\u932F]",
      language: {
        switched: "\\u8A9E\\u8A00\\u5DF2\\u5207\\u63DB\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8A9E\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8A2D\\u5B9A '{{key}}' \\u5DF2\\u5F9E '{{oldValue}}' \\u8B8A\\u66F4\\u70BA '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u555F\\u7528",
          disabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u8A2D\\u5B9A\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u8A2D\\u5B9A\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u5132\\u5B58\\u8A2D\\u5B9A..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u5132\\u5B58\\u7684\\u8A2D\\u5B9A\\u6642\\u51FA\\u932F\\uFF1A",
        invalidObject: "\\u8A66\\u5716\\u70BA\\u8A2D\\u5B9A\\u5132\\u5B58\\u4E00\\u500B\\u7121\\u6548\\u7269\\u4EF6\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u904E\\u6FFE: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u6B63\\u5728\\u4E3B\\u7DDA\\u7A0B\\u4E2D\\u958B\\u59CB\\u8655\\u7406...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u6383\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u958B\\u59CB\\u57F7\\u884C\\uFF0C\\u5617\\u8A66\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u8655\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u689D\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u6383\\u63CF Worker] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002\\u6B63\\u5728\\u767C\\u56DE\\u4E3B\\u7DDA\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u6383\\u63CF] Web Worker \\u5DF2\\u5EFA\\u7ACB\\uFF0C\\u6B63\\u5728\\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u9032\\u884C\\u8655\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u6703\\u8A71\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        domObserver: {
          stopped: "[\\u6703\\u8A71\\u6383\\u63CF] \\u5DF2\\u505C\\u6B62\\u76E3\\u807D DOM \\u8B8A\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u6703\\u8A71\\u6383\\u63CF - \\u5099\\u9078] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u6703\\u8A71\\u6383\\u63CF - \\u5099\\u9078] \\u8CC7\\u6599\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u6703\\u8A71\\u6383\\u63CF Worker]",
          starting: "\\u6703\\u8A71\\u6383\\u63CF\\uFF1A\\u6B63\\u5728\\u5617\\u8A66\\u555F\\u52D5 Web Worker...",
          initFailed: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u6703\\u8A71\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          initialized: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u767C\\u9001 {{count}} \\u689D\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u958B\\u59CB\\u6703\\u8A71\\u3002",
          initSyncError: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          clearCommandSent: "[\\u6703\\u8A71\\u6383\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u767C\\u9001\\u81F3 worker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u8907\\u88FD\\u4E86 {{count}} \\u500B\\u5B57\\u5143\\u3002",
          nothingToCopy: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u4F46\\u6C92\\u6709\\u5167\\u5BB9\\u53EF\\u8907\\u88FD\\u6216\\u6309\\u9215\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u6703\\u8A71\\u6383\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8ABF\\u7528\\u56DE\\u547C..."
          },
          quickScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u5FEB\\u901F\\u6383\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u4F7F\\u7528\\u8005\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u4E3B\\u6A21\\u614B\\u6846...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u4E3B\\u6A21\\u614B\\u6846...",
          scanFailed: "\\u975C\\u614B\\u6383\\u63CF\\u5931\\u6557: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5167\\u5BB9\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\u3002"
        }
      },
      exporter: {
        buttonClicked: "\\u532F\\u51FA\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u4E26\\u7522\\u751FCSV\\u6642\\u51FA\\u932F: {{error}}",
        fileExported: "\\u6A94\\u6848\\u5DF2\\u532F\\u51FA: {{filename}}",
        noContent: "\\u7121\\u5167\\u5BB9\\u53EF\\u532F\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u532F\\u51FA\\u683C\\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8ACB\\u6C42\\u6703\\u8A71\\u6383\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        exportingQuickScanData: "\\u6B63\\u5728\\u532F\\u51FA\\u5FEB\\u901F\\u6383\\u63CF\\u6A21\\u5F0F\\u8A18\\u61B6\\u9AD4\\u4E2D\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        inIframe: "\\u8173\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u904E\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u8173\\u672C\\u521D\\u59CB\\u5316\\u958B\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8A2D\\u5B9A\\u5DF2\\u8F09\\u5165:"
      },
      dom: {
        ttpCreationError: "\\u5EFA\\u7ACB Trusted Type \\u7B56\\u7565\\u5931\\u6557:",
        svgParseError: "SVG \\u5B57\\u4E32\\u7121\\u6548\\u6216\\u89E3\\u6790\\u5931\\u6557:"
      },
      elementScan: {
        starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
        stopping: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u65B0\\u589E\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u79FB\\u9664\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        stateReset: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u72C0\\u614B\\u5DF2\\u91CD\\u8A2D\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9078\\u64C7\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u61F8\\u505C\\u65BC <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u9375\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u9032\\u5165\\u8ABF\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C64\\u7D1A\\u8DEF\\u5F91\\u5DF2\\u69CB\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u70BA\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8ABF\\u6574\\u9078\\u64C7\\u5C64\\u7D1A\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9078\\u64C7\\u5DF2\\u78BA\\u8A8D\\uFF0C\\u6B63\\u5728\\u5F9E <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u66AB\\u5B58\\u3002\\u7E3D\\u6578\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u78BA\\u8A8D\\u9078\\u64C7\\u3002\\u6B63\\u5728\\u8655\\u7406 {{count}} \\u500B\\u5DF2\\u66AB\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u5F9E\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u689D\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u78BA\\u8A8D\\u5931\\u6557\\uFF1A\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u76EE\\u6A19\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u5075\\u6E2C\\u5230\\u53F3\\u9375\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u8655\\u7406\\u904E\\u7A0B\\u4E2D\\u767C\\u751F\\u932F\\u8AA4: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u70BA {{count}} \\u500B\\u7236\\u5143\\u7D20\\u65B0\\u589E\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u6B63\\u5728\\u555F\\u52D5...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002",
          initFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u700F\\u89BD\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u932F\\u8AA4: {{error}}"
        },
        switchToFallback: "\\u6B63\\u5728\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u9996\\u6B21\\u5EFA\\u7ACB\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u70BA <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u5EFA\\u7ACB\\u8ABF\\u6574\\u5DE5\\u5177\\u5217\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u5217\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6ED1\\u687F\\u5C64\\u7D1A\\u8B8A\\u70BA {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u91CD\\u65B0\\u9078\\u64C7\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        stageClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u66AB\\u5B58\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u6383\\u89C0UI\\uFF1A\\u300C\\u53D6\\u6D88\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u78BA\\u8A8D\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        dragStarted: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u958B\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u7D50\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u5217\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u547C\\u51FD\\u6578\\u51FA\\u932F:"
      },
      trustedTypes: {
        workerPolicyError: "\\u5EFA\\u7ACB Trusted Types worker \\u7B56\\u7565\\u5931\\u6557:",
        htmlPolicyError: "\\u5EFA\\u7ACB Trusted Types HTML \\u7B56\\u7565\\u5931\\u6557:",
        defaultWorkerPolicyWarning: "\\u7528\\u65BC worker URL \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u65BC HTML \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u5B78",
      elementScan: '<p class="tutorial-content">\\u9019\\u662F\\u4E00\\u500B\\u7528\\u65BC\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u5B78\\u7684\\u4F54\\u4F4D\\u7B26\\u3002\\u652F\\u63F4\\u5BCC\\u6587\\u672C\\u683C\\u5F0F\\u3002</p>'
    }
  };
  // src/shared/i18n/management/languages.js
  var supportedLanguages = [
    { code: "en", name: "English" },
    { code: "zh-CN", name: "\\u7B80\\u4F53\\u4E2D\\u6587" },
    { code: "zh-TW", name: "\\u7E41\\u9AD4\\u4E2D\\u6587" }
  ];
  // src/shared/i18n/index.js
  var translationModules = {
    en: en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
  var translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
      acc[lang.code] = translationModules[lang.code];
    }
    return acc;
  }, {});
  var currentTranslations = translations.en;
  function t(key, replacements) {
    let value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    if (value === void 0) {
      return key;
    }
    if (replacements) {
      Object.keys(replacements).forEach((placeholder) => {
        const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
        value = value.replace(regex, replacements[placeholder]);
      });
    }
    return value;
  }
  function getAvailableLanguages() {
    return supportedLanguages.map((lang) => ({
      value: lang.code,
      label: lang.name
    }));
  }
  // src/shared/utils/ignoredTerms.js
  var IGNORED_TERMS = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript",
    "TypeScript",
    "Hugging Face",
    "Google",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "OpenAI",
    "ChatGPT",
    "API",
    "Glossary of computer science",
    "HTML",
    "CSS",
    "JSON",
    "XML",
    "HTTP",
    "HTTPS",
    "URL",
    "IP address",
    "DNS",
    "CPU",
    "GPU",
    "RAM",
    "SSD",
    "USB",
    "Wi-Fi",
    "Bluetooth",
    "VPN",
    "AI"
  ];
  var ignoredTerms_default = IGNORED_TERMS;
  // src/assets/icons/themeIcon.js
  var themeIcon = \`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>\`;
  // src/assets/icons/languageIcon.js
  var languageIcon_default = \`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>\`;
  // src/assets/icons/infoIcon.js
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
  // src/features/settings/config.js
  var selectSettingsDefinitions = [
    {
      id: "theme-select",
      key: "theme",
      label: "settings.theme",
      icon: themeIcon,
      options: [
        { value: "light", label: "settings.themes.light" },
        { value: "dark", label: "settings.themes.dark" },
        { value: "system", label: "settings.themes.system" }
      ]
    },
    {
      id: "language-select",
      key: "language",
      label: "settings.language",
      icon: languageIcon_default,
      // \u76F4\u63A5\u4ECE i18n \u6A21\u5757\u83B7\u53D6\u8BED\u8A00\u5217\u8868\uFF0C\u5176\u6807\u7B7E\u5DF2\u7ECF\u662F\u539F\u751F\u540D\u79F0\uFF0C\u65E0\u9700\u518D\u7FFB\u8BD1\u3002
      options: getAvailableLanguages()
    }
  ];
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "settings.filters.numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.numbers", text: "tooltip.filters.numbers" } },
    { id: "filter-chinese", key: "chinese", label: "settings.filters.chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.chinese", text: "tooltip.filters.chinese" } },
    { id: "filter-contains-chinese", key: "containsChinese", label: "settings.filters.contains_chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.contains_chinese", text: "tooltip.filters.contains_chinese" } },
    { id: "filter-emoji-only", key: "emojiOnly", label: "settings.filters.emoji_only", tooltip: { titleIcon: infoIcon, title: "settings.filters.emoji_only", text: "tooltip.filters.emoji_only" } },
    { id: "filter-symbols", key: "symbols", label: "settings.filters.symbols", tooltip: { titleIcon: infoIcon, title: "settings.filters.symbols", text: "tooltip.filters.symbols" } },
    { id: "filter-term", key: "termFilter", label: "settings.filters.term", tooltip: { titleIcon: infoIcon, title: "settings.filters.term", text: "tooltip.filters.term" } },
    { id: "filter-single-letter", key: "singleLetter", label: "settings.filters.single_letter", tooltip: { titleIcon: infoIcon, title: "settings.filters.single_letter", text: "tooltip.filters.single_letter" } },
    {
      id: "filter-repeating-chars",
      key: "repeatingChars",
      label: "settings.filters.repeating_chars",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.repeating_chars",
        text: "tooltip.filters.repeating_chars"
      }
    },
    { id: "filter-file-paths", key: "filePath", label: "settings.filters.file_paths", tooltip: { titleIcon: infoIcon, title: "settings.filters.file_paths", text: "tooltip.filters.file_paths" } },
    { id: "filter-hex-colors", key: "hexColor", label: "settings.filters.hex_color_codes", tooltip: { titleIcon: infoIcon, title: "settings.filters.hex_color_codes", text: "tooltip.filters.hex_color_codes" } },
    { id: "filter-emails", key: "email", label: "settings.filters.email_addresses", tooltip: { titleIcon: infoIcon, title: "settings.filters.email_addresses", text: "tooltip.filters.email_addresses" } },
    { id: "filter-uuids", key: "uuid", label: "settings.filters.uuids", tooltip: { titleIcon: infoIcon, title: "settings.filters.uuids", text: "tooltip.filters.uuids" } },
    { id: "filter-git-hashes", key: "gitCommitHash", label: "settings.filters.git_commit_hashes", tooltip: { titleIcon: infoIcon, title: "settings.filters.git_commit_hashes", text: "tooltip.filters.git_commit_hashes" } },
    { id: "filter-website-urls", key: "websiteUrl", label: "settings.filters.website_urls", tooltip: { titleIcon: infoIcon, title: "settings.filters.website_urls_title", text: "tooltip.filters.website_urls" } },
    { id: "filter-shorthand-numbers", key: "shorthandNumber", label: "settings.filters.shorthand_numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.shorthand_numbers_title", text: "tooltip.filters.shorthand_numbers" } }
  ];
  // src/shared/utils/filterLogic.js
  var filterConfigMap = new Map(filterDefinitions.map((def) => [def.key, def.label]));
  var ruleChecks = /* @__PURE__ */ new Map([
    ["numbers", {
      regex: /^[$\\\u20AC\\\xA3\\\xA5\\d,.\\s]+$/,
      label: filterConfigMap.get("numbers")
    }],
    ["chinese", {
      regex: /^[\\u4e00-\\u9fa5\\s]+$/u,
      label: filterConfigMap.get("chinese")
    }],
    ["containsChinese", {
      regex: /[\\u4e00-\\u9fa5]/u,
      label: filterConfigMap.get("containsChinese")
    }],
    ["emojiOnly", {
      regex: /^[\\p{Emoji}\\s]+$/u,
      label: filterConfigMap.get("emojiOnly")
    }],
    ["symbols", {
      // \u8FD9\u4E2A\u903B\u8F91\u6BD4\u8F83\u7279\u6B8A\uFF0C\u662F\u201C\u4E0D\u5305\u542B\u5B57\u6BCD\u6216\u6570\u5B57\u201D\uFF0C\u6240\u4EE5\u6211\u4EEC\u7528\u4E00\u4E2A\u51FD\u6570\u6765\u5904\u7406
      test: (text) => !/[\\p{L}\\p{N}]/u.test(text),
      label: filterConfigMap.get("symbols")
    }],
    ["termFilter", {
      test: (text) => ignoredTerms_default.includes(text),
      label: filterConfigMap.get("termFilter")
    }],
    ["singleLetter", {
      regex: /^[a-zA-Z]$/,
      label: filterConfigMap.get("singleLetter")
    }],
    ["repeatingChars", {
      regex: /^\\s*(.)\\1+\\s*$/,
      label: filterConfigMap.get("repeatingChars")
    }],
    ["filePath", {
      regex: /^(?:[a-zA-Z]:\\\\|\\\\\\\\|~|\\.\\.?\\/)[\\w\\-\\.\\/ \\\\]*[\\w\\-\\.]+\\.[\\w]{2,4}$/,
      label: filterConfigMap.get("filePath")
    }],
    ["hexColor", {
      regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
      label: filterConfigMap.get("hexColor")
    }],
    ["email", {
      regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/,
      label: filterConfigMap.get("email")
    }],
    ["uuid", {
      regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      label: filterConfigMap.get("uuid")
    }],
    ["gitCommitHash", {
      regex: /^[0-9a-f]{7,40}$/i,
      label: filterConfigMap.get("gitCommitHash")
    }],
    ["websiteUrl", {
      // \u5339\u914D\u5E38\u89C1\u7684\u7F51\u5740\u683C\u5F0F\uFF0C\u5305\u62EC\u534F\u8BAE\u3001www\u524D\u7F00\u548C\u88F8\u57DF\u540D\uFF0C\u8981\u6C42\u4E25\u683C\u5339\u914D\u6574\u4E2A\u5B57\u7B26\u4E32\u4EE5\u907F\u514D\u8BEF\u4F24\u3002
      regex: /^(?:(?:https?|ftp):\\/\\/)?(?:www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/.*)?$/,
      label: filterConfigMap.get("websiteUrl")
    }],
    ["shorthandNumber", {
      // \u5339\u914D\u5E26k/m/b\u540E\u7F00\u7684\u6570\u5B57\uFF0C\u652F\u6301\u6574\u6570\u3001\u6D6E\u70B9\u6570\u3001\u5927\u5C0F\u5199\u4EE5\u53CA\u53EF\u9009\u7684\u7A7A\u683C\u3002
      regex: /^\\d+(\\.\\d+)?\\s?[kmb]$/i,
      label: filterConfigMap.get("shorthandNumber")
    }]
  ]);
  function shouldFilter(text, filterRules) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return t(rule.label);
        }
      }
    }
    return null;
  }
  // src/shared/utils/formatting.js
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => \`    ["\${text.replace(/"/g, '\\\\"').replace(/\\n/g, "\\\\n")}", ""]\`
    );
    return \`[
\${result.join(",\\n")}
]\`;
  };
  // src/features/quick-scan/worker.js
  self.onmessage = (event) => {
    const { type, payload } = event.data;
    const enableDebugLogging = payload.enableDebugLogging || false;
    const translations2 = payload.translations || {};
    const t2 = (key, replacements) => {
      let value = translations2[key] || key;
      if (replacements) {
        Object.keys(replacements).forEach((placeholder) => {
          const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
          value = value.replace(regex, replacements[placeholder]);
        });
      }
      return value;
    };
    const log2 = (...args) => {
      if (enableDebugLogging) {
        console.log(t2("workerLogPrefix"), ...args);
      }
    };
    if (type === "scan") {
      const { texts, filterRules } = payload;
      const uniqueTexts = /* @__PURE__ */ new Set();
      if (Array.isArray(texts)) {
        texts.forEach((rawText) => {
          if (!rawText || typeof rawText !== "string") return;
          const normalizedText = rawText.normalize("NFC");
          const textForFiltering = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n").trim();
          if (textForFiltering === "") return;
          const filterResult = shouldFilter(textForFiltering, filterRules);
          if (filterResult) {
            log2(t2("textFiltered", { text: textForFiltering, reason: filterResult }));
            return;
          }
          uniqueTexts.add(normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n"));
        });
      }
      const textsArray = Array.from(uniqueTexts);
      const formattedText = formatTextsForTranslation(textsArray);
      log2(t2("scanComplete", { count: textsArray.length }));
      self.postMessage({
        type: "scanCompleted",
        payload: {
          formattedText,
          count: textsArray.length
        }
      });
    }
  };
})();
`;
        const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
        const trustedUrl = createTrustedWorkerUrl(workerUrl);
        const worker2 = new Worker(trustedUrl);
        worker2.onmessage = (event) => {
          const { type, payload } = event.data;
          if (type === "scanCompleted") {
            log(t("log.quickScan.worker.completed", { count: payload.count }));
            updateScanCount(payload.count, "static");
            resolve(payload);
            worker2.terminate();
          }
        };
        worker2.onerror = (error) => {
          log(t("log.quickScan.worker.initFailed"), "warn");
          log(t("log.quickScan.worker.originalError", { error: error.message }), "debug");
          worker2.terminate();
          runFallback();
        };
        log(t("log.quickScan.worker.sendingData", { count: texts.length }));
        worker2.postMessage({
          type: "scan",
          payload: {
            texts,
            filterRules: filterRules2,
            enableDebugLogging,
            translations: {
              workerLogPrefix: t("log.quickScan.worker.logPrefix"),
              textFiltered: t("log.textProcessor.filtered"),
              scanComplete: t("log.quickScan.worker.completed")
            }
          }
        });
      } catch (e) {
        log(t("log.quickScan.worker.initSyncError", { error: e.message }), "error");
        runFallback();
      }
    });
  };
  var modalOverlay = null;
  var outputTextarea = null;
  var lineNumbersDiv = null;
  var statsContainer = null;
  var placeholder = null;
  var loadingContainer = null;
  var canvasContext = null;
  var currentLineMap = [];
  var currentMode = "quick-scan";
  var SHOW_PLACEHOLDER = "::show_placeholder::";
  var SHOW_LOADING = "::show_loading::";
  function setModalOverlay(element) {
    modalOverlay = element;
  }
  function setOutputTextarea(element) {
    outputTextarea = element;
  }
  function setLineNumbersDiv(element) {
    lineNumbersDiv = element;
  }
  function setStatsContainer(element) {
    statsContainer = element;
  }
  function setPlaceholder(element) {
    placeholder = element;
  }
  function setLoadingContainer(element) {
    loadingContainer = element;
  }
  function setCanvasContext(context) {
    canvasContext = context;
  }
  function setCurrentLineMap(map) {
    currentLineMap = map;
  }
  function setCurrentMode(mode) {
    currentMode = mode;
  }
  function getCurrentMode() {
    return currentMode;
  }
  var sessionTexts =  new Set();
  var filterRules = {};
  function initFallback(rules) {
    filterRules = rules || {};
    log(t("log.sessionScan.fallback.initialized"));
  }
  function processTextsInFallback(texts, logPrefix = "") {
    let changed = false;
    if (Array.isArray(texts)) {
      texts.forEach((rawText) => {
        if (!rawText || typeof rawText !== "string") return;
        const normalizedText = rawText.normalize("NFC");
        const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n").trim();
        if (textForFiltering === "") return;
        const filterResult = shouldFilter(textForFiltering, filterRules);
        if (filterResult) {
          const prefix = logPrefix ? `${logPrefix} ` : "";
          log(prefix + t("log.textProcessor.filtered", { text: textForFiltering, reason: filterResult }));
          return;
        }
        const originalSize = sessionTexts.size;
        sessionTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, "\n"));
        if (sessionTexts.size > originalSize) {
          changed = true;
        }
      });
    }
    return changed;
  }
  function getCountInFallback() {
    return sessionTexts.size;
  }
  function getSummaryInFallback() {
    const textsArray = Array.from(sessionTexts);
    if (!textsArray || textsArray.length === 0) {
      return "[]";
    }
    const result = textsArray.map(
      (text) => `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`
    );
    return `[
${result.join(",\n")}
]`;
  }
  function clearInFallback() {
    sessionTexts.clear();
    log(t("log.sessionScan.fallback.cleared"));
  }
  var isRecording = false;
  var observer = null;
  var worker = null;
  var useFallback = false;
  var onSummaryCallback = null;
  var onUpdateCallback = null;
  var currentCount = 0;
  on("clearSessionScan", () => {
    clearSessionData();
  });
  var handleMutations = (mutations) => {
    const ignoredSelectorString = appConfig.scanner.ignoredSelectors.join(", ");
    const textsBatch = [];
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE || node.closest(ignoredSelectorString)) return;
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (walker.currentNode.nodeValue) {
            textsBatch.push(walker.currentNode.nodeValue);
          }
        }
      });
    });
    if (textsBatch.length > 0) {
      const logPrefix = "\u52A8\u6001\u65B0\u53D1\u73B0";
      if (useFallback) {
        if (processTextsInFallback(textsBatch, logPrefix)) {
          const count = getCountInFallback();
          if (onUpdateCallback) onUpdateCallback(count);
          updateScanCount(count, "session");
        }
      } else if (worker) {
        worker.postMessage({
          type: "data",
          payload: { texts: textsBatch, logPrefix }
        });
      }
    }
  };
  function clearSessionData() {
    currentCount = 0;
    if (useFallback) {
      clearInFallback();
      if (onUpdateCallback) onUpdateCallback(0);
      updateScanCount(0, "session");
      fire("sessionCleared");
    } else if (worker) {
      worker.postMessage({ type: "clear" });
      log(t("log.sessionScan.worker.clearCommandSent"));
    }
  }
  var start = (onUpdate) => {
    if (isRecording) return;
    if (worker) worker.terminate();
    currentCount = 0;
    onUpdateCallback = onUpdate;
    useFallback = false;
    isRecording = true;
    const { filterRules: filterRules2 } = loadSettings();
    const activateFallbackMode = (initialTexts2) => {
      log(t("log.sessionScan.switchToFallback"), "warn");
      worker = null;
      useFallback = true;
      showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
      initFallback(filterRules2);
      processTextsInFallback(initialTexts2);
      const count = getCountInFallback();
      if (onUpdateCallback) onUpdateCallback(count);
      updateScanCount(count, "session");
      observer = new MutationObserver(handleMutations);
      observer.observe(document.body, { childList: true, subtree: true });
    };
    const initialTexts = extractAndProcessText();
    try {
      log(t("log.sessionScan.worker.starting"));
      const workerScript = `(() => {
  // src/shared/i18n/en.json
  var en_default = {
    common: {
      scan: "Scan",
      stop: "Stop",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      discovered: "Discovered:",
      confirm: "Confirm",
      cancel: "Cancel",
      export: "Export",
      reselect: "Reselect",
      stage: "Stage"
    },
    export: {
      exportAsTxt: "Export as TXT",
      exportAsJson: "Export as JSON",
      exportAsCsv: "Export as CSV",
      csv: {
        id: "ID",
        original: "Original",
        translation: "Translation"
      }
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      filters: {
        numbers: "Filter Numbers/Currency",
        chinese: "Filter Chinese-Only Text",
        contains_chinese: "Filter Text Containing Chinese",
        emoji_only: "Filter Emoji-Only Text",
        symbols: "Filter Symbol-Only Text",
        term: "Filter Specific Terms",
        single_letter: "Filter Single English Letters",
        repeating_chars: "Filter Repeating Characters",
        file_paths: "Filter File Paths",
        hex_color_codes: "Filter Hex Color Codes",
        email_addresses: "Filter Email Addresses",
        uuids: "Filter UUIDs",
        git_commit_hashes: "Filter Git Commit Hashes",
        website_urls: "Filter Website URLs",
        website_urls_title: "Filter Website URLs",
        shorthand_numbers: "Filter Shorthand Numbers",
        shorthand_numbers_title: "Filter Shorthand Numbers"
      },
      display: {
        show_fab: "Show Floating Button",
        fab_position: "Floating Button Position",
        fab_positions: {
          bottom_right: "Bottom Right",
          top_right: "Top Right",
          bottom_left: "Bottom Left",
          top_left: "Top Left"
        },
        show_line_numbers: "Show Line Numbers",
        show_statistics: "Show Statistics",
        enable_word_wrap: "Enable Word Wrap",
        text_truncation_limit: "Enable Text Truncation Limit",
        character_limit: "Character Limit",
        show_scan_count: "Enable Scan Count in Title"
      },
      advanced: {
        enable_debug_logging: "Enable Debug Logging"
      },
      panel: {
        title: "Settings Panel"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Session Scan",
      stagedCount: "Staged:",
      elementFinished: "Element scan finished, found {{count}} items.",
      startSession: "Start Dynamic Scan Session",
      stopSession: "Stop Dynamic Scan Session",
      finished: "Scan finished, found {{count}} items.",
      quickFinished: "Quick scan finished, found {{count}} items.",
      sessionStarted: "Session scan started.",
      sessionInProgress: "Scan in progress...",
      truncationWarning: "To maintain UI fluency, only a portion of the text is displayed here. The full content will be available upon export."
    },
    results: {
      title: "Extracted Text",
      scanCountSession: "Scanned {{count}} items",
      scanCountStatic: "Total {{count}} items scanned",
      totalCharacters: "Total Characters",
      totalLines: "Total Lines",
      noSummary: "No summary available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy.",
      contentCleared: "Content cleared.",
      noTextSelected: "No text selected.",
      scanFailed: "Scan failed.",
      elementScanStarted: "Element scan started.",
      cspWorkerWarning: "Switched to compatibility scan mode due to website security restrictions."
    },
    placeholders: {
      click: "Click ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " to start a new scan session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " to perform a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone."
    },
    tooltip: {
      summary: "View Summary",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan",
      element_scan: "Element Scan",
      disabled: {
        scan_in_progress: "Another scan is in progress"
      },
      filters: {
        title: "Content Filter Explanation",
        numbers: 'This rule filters out text that consists <strong>entirely</strong> of numbers, spaces, thousand separators (.), decimal points (,), and some currency symbols ($, \\u20AC, \\xA3, \\xA5).<br><br><strong>More Examples:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: 'This rule filters out text that consists <strong>entirely</strong> of Chinese characters and spaces, excluding any punctuation.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (will be filtered)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (will not be filtered)',
        contains_chinese: \`This rule filters out <strong>any</strong> text that contains at least one Chinese character, regardless of other characters.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D World" (will be filtered)<br>\\u2022 "Chapter 1" (will be filtered, as '\\u7B2C 1 \\u7AE0' contains '\\u7B2C' and '\\u7AE0')\`,
        emoji_only: 'This rule filters out text that consists <strong>entirely</strong> of one or more emoji characters and spaces.<br><br><strong>Examples:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: 'This rule filters out text that consists <strong>entirely</strong> of various punctuation and symbols.<br><br><strong>More Examples:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: 'This rule filters out common UI terms that typically do not require translation.<br><br><strong>More Examples:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: 'This rule filters out text consisting of a <strong>single</strong> English letter, case-insensitive.<br><br><strong>Examples:</strong><br>\\u2022 "A" (will be filtered)<br>\\u2022 "b" (will be filtered)<br>\\u2022 "AB" (will not be filtered)',
        repeating_chars: 'This rule filters out text composed of the <strong>same character</strong> repeating 2 or more times consecutively.<br><br><strong>Examples:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: 'This rule attempts to identify and filter out text that resembles an operating system file path and <strong>includes a file extension</strong>. It does not match URLs.<br><br><strong>More Examples:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: 'This rule filters out standard CSS hexadecimal color codes (3, 4, 6, or 8 digits, the latter including an alpha channel).<br><br><strong>Examples:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4-digit)<br>\\u2022 "#ff000080" (8-digit)',
        email_addresses: 'This rule filters out text that matches the standard format of an email address.<br><br><strong>Examples:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: 'This rule filters out Universally Unique Identifiers (UUIDs).<br><br><strong>Example:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: 'This rule filters out standard Git commit hashes (long or short).<br><br><strong>Examples:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: 'This rule filters out text that is a <strong>standalone URL</strong>. It is designed to be strict to avoid accidentally removing text that is not a link.<br><br><strong>More Examples:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: 'This rule filters out numbers that use <strong>common shorthand suffixes</strong> for thousands (k), millions (m), or billions (b), case-insensitive.<br><br><strong>More Examples:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "Display Settings Explanation",
        show_fab: "Control whether to display the <strong>Floating Action Button (FAB)</strong> in the bottom-right corner of webpages. This serves as the primary entry point for both static and dynamic text extraction. <br><br>If you disable this button, you can re-enable it via the settings panel in the Tampermonkey extension menu.",
        show_scan_count: "When enabled, the title bar of the results window will show a <strong>real-time count</strong> of the total text items found in the current scan. This is especially useful for monitoring the progress of a long-running <strong>Dynamic Scan</strong>.",
        show_line_numbers: "Displays line numbers to the left of the text area in the results window. This provides a <strong>precise reference point</strong> when you need to discuss or note a specific line of text.",
        show_statistics: "Displays <strong>real-time statistics</strong> about the extracted content in the status bar at the bottom of the results window, including <strong>total lines</strong> and <strong>total characters</strong>. This helps you quickly assess the volume of the content.",
        enable_word_wrap: "Controls how long lines of text are displayed in the results window.<br><br>\\u2022 <strong>Enabled:</strong> Long lines will wrap to fit the window's width.<br>\\u2022 <strong>Disabled:</strong> Long lines will remain on a single line, causing a horizontal scrollbar to appear.",
        text_truncation_limit: "This is a <strong>performance-saving</strong> feature. If the script extracts an <strong>extremely long single line of text</strong> (e.g., a base64 encoded image), it could cause the browser to <strong>lag or become unresponsive</strong>.<br><br>This setting truncates any single line exceeding the specified length to ensure the UI remains smooth. <strong>Note: This only affects the display; the exported file will still contain the full, untruncated content.</strong>"
      },
      advanced: {
        title: "Advanced Settings Explanation",
        enable_debug_logging: "When enabled, the script will output detailed internal status, execution steps, and error messages to the browser's <strong>Developer Tools Console</strong> (usually opened with F12). This is primarily for developers or users who need to submit detailed bug reports."
      }
    },
    log: {
      prefix: "[Text Extractor Script-Debug]",
      language: {
        switched: "Language switched to: {{lang}}",
        notFound: "Language '{{lang}}' not found, falling back to 'en'."
      },
      settings: {
        changed: "Setting '{{key}}' changed from '{{oldValue}}' to '{{newValue}}'",
        filterRuleChanged: {
          enabled: "Filter rule '{{key}}' has been enabled",
          disabled: "Filter rule '{{key}}' has been disabled"
        },
        panel: {
          opening: "Opening settings panel...",
          closing: "Closing settings panel...",
          saving: "Saving settings..."
        },
        parseError: "Error parsing saved settings:",
        invalidObject: "Attempted to save an invalid object for settings:"
      },
      textProcessor: {
        filtered: 'Text filtered: "{{text}}" (Reason: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[Quick Scan] Switching to main thread fallback.",
        fallbackFailed: "[Quick Scan] Main thread fallback failed: {{error}}",
        fallback: {
          starting: "[Quick Scan - Fallback] Starting processing in main thread...",
          completed: "[Quick Scan - Fallback] Processing complete, found {{count}} unique texts."
        },
        worker: {
          logPrefix: "[Quick Scan Worker]",
          starting: "[Quick Scan] Starting execution, attempting to use Web Worker...",
          completed: "[Quick Scan] Worker processing successful, received {{count}} texts.",
          scanComplete: "[Quick Scan Worker] Processing complete, found {{count}} unique texts. Sending back to main thread...",
          initFailed: "[Quick Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Quick Scan] Original error: {{error}}",
          sendingData: "[Quick Scan] Web Worker created, sending {{count}} texts for processing...",
          initSyncError: "[Quick Scan] Synchronous error during Worker initialization: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[Session Scan] Switching to main thread fallback.",
        domObserver: {
          stopped: "[Session Scan] Stopped listening for DOM changes."
        },
        fallback: {
          initialized: "[Session Scan - Fallback] Initialized.",
          cleared: "[Session Scan - Fallback] Data cleared."
        },
        worker: {
          logPrefix: "[Session Scan Worker]",
          starting: "Session Scan: Attempting to start Web Worker...",
          initFailed: "[Session Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Session Scan] Original error: {{error}}",
          initialized: "[Session Scan] Worker initialized successfully, sent {{count}} initial texts to start the session.",
          initSyncError: "[Session Scan] Synchronous error during Worker initialization: {{error}}",
          clearCommandSent: "[Session Scan] Clear command sent to worker."
        }
      },
      ui: {
        copyButton: {
          copied: "Copy button clicked, copied {{count}} characters.",
          nothingToCopy: "Copy button clicked, but there was no content to copy or the button was disabled."
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "User confirmed clearing session scan texts, invoking callback..."
          },
          quickScan: {
            confirmed: "User confirmed clearing quick scan texts."
          },
          cancelled: "User cancelled the clear operation."
        },
        modal: {
          opening: "Opening main modal...",
          closing: "Closing main modal...",
          scanFailed: "Static scan failed: {{error}}",
          clearContent: "Clear content button clicked."
        }
      },
      exporter: {
        buttonClicked: "Export button clicked, format: {{format}}.",
        csvError: "Error while parsing text and generating CSV: {{error}}",
        fileExported: "File exported: {{filename}}",
        noContent: "No content to export.",
        unknownFormat: "Unknown export format: {{format}}"
      },
      main: {
        requestingSessionScanData: "Requesting full data from session-scan mode...",
        exportingQuickScanData: "Exporting full data from quick-scan mode's memory...",
        inIframe: "Script is in an iframe, skipping initialization.",
        initializing: "Script initialization started...",
        initialSettingsLoaded: "Initial settings loaded:"
      },
      dom: {
        ttpCreationError: "Failed to create Trusted Type policy:",
        svgParseError: "Invalid or failed to parse SVG string:"
      },
      elementScan: {
        starting: "Element Scan started.",
        stopping: "Element Scan stopped.",
        listenersAdded: "Global event listeners for element scan added.",
        listenersRemoved: "Global event listeners for element scan removed.",
        stateReset: "Element scan state has been reset.",
        reselecting: "Returning to element reselection mode.",
        hovering: "Hovering over <{{tagName}}>.",
        escapePressed: "Escape key pressed, stopping element scan.",
        clickedEnteringAdjust: "Element <{{tagName}}> clicked, entering adjustment mode.",
        pathBuilt: "Element path built, depth: {{depth}}.",
        adjustingLevel: "Adjusting selection level to {{level}} ({{tagName}}).",
        confirmExtracting: "Selection confirmed, extracting text from <{{tagName}}>.",
        staged: "Element staged. Total staged: {{count}}.",
        confirmingStaged: "Confirming selection. Processing {{count}} staged elements.",
        extractedCount: "Extracted {{count}} raw text fragments from element.",
        confirmFailedNoTarget: "Confirmation failed: no target element selected.",
        rightClickExit: "Right-click detected, stopping element scan.",
        processingError: "An error occurred during text processing: {{error}}",
        scrollListenersAdded: "Added {{count}} scroll listeners to parent elements.",
        scrollListenersRemoved: "Removed all scroll listeners.",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "Element Scan Worker is starting...",
          sendingData: "Sending {{count}} text fragments to Element Scan Worker.",
          completed: "Element Scan Worker completed, found {{count}} unique texts.",
          initFailed: "Element Scan Worker initialization failed. The browser's CSP might be blocking data: URLs.",
          initSyncError: "Synchronous error during Element Scan Worker initialization: {{error}}",
          originalError: "Original worker error: {{error}}"
        },
        switchToFallback: "Switching to main thread fallback for Element Scan.",
        fallbackFailed: "Element Scan fallback mode failed: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "Element Scan UI: Creating highlight elements for the first time.",
        updatingHighlight: "Element Scan UI: Updating highlight for <{{tagName}}>.",
        creatingToolbar: "Element Scan UI: Creating adjustment toolbar.",
        toolbarPositioned: "Element Scan UI: Toolbar positioned.",
        sliderChanged: "Element Scan UI: Slider changed to level {{level}}",
        reselectClicked: "Element Scan UI: 'Reselect' button clicked.",
        stageClicked: "Element Scan UI: 'Stage' button clicked.",
        cancelClicked: "Element Scan UI: 'Cancel' button clicked.",
        confirmClicked: "Element Scan UI: 'Confirm' button clicked.",
        dragStarted: "Element Scan UI: Drag started.",
        dragEnded: "Element Scan UI: Drag ended.",
        cleaningHighlights: "Element Scan UI: Cleaning up highlight elements.",
        cleaningToolbar: "Element Scan UI: Cleaning up toolbar."
      },
      eventBus: {
        callbackError: "Error in callback for event '{{eventName}}':"
      },
      trustedTypes: {
        workerPolicyError: "Failed to create Trusted Types worker policy:",
        htmlPolicyError: "Failed to create Trusted Types HTML policy:",
        defaultWorkerPolicyWarning: "Trusted Types default policy failed for worker URL, falling back to raw URL.",
        defaultHtmlPolicyWarning: "Trusted Types default policy failed for HTML, falling back to raw string."
      }
    },
    tutorial: {
      elementScanTitle: "Element Scan Guide",
      elementScan: '<p class="tutorial-content">This is a placeholder for the element scan tutorial. Rich text is supported.</p>'
    }
  };
  // src/shared/i18n/zh-CN.json
  var zh_CN_default = {
    common: {
      scan: "\\u626B\\u63CF",
      stop: "\\u505C\\u6B62",
      resume: "\\u6062\\u590D",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u590D\\u5236",
      save: "\\u4FDD\\u5B58",
      discovered: "\\u5DF2\\u53D1\\u73B0:",
      confirm: "\\u786E\\u8BA4",
      cancel: "\\u53D6\\u6D88",
      export: "\\u5BFC\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9009\\u62E9",
      stage: "\\u6682\\u5B58"
    },
    export: {
      exportAsTxt: "\\u5BFC\\u51FA\\u4E3A TXT",
      exportAsJson: "\\u5BFC\\u51FA\\u4E3A JSON",
      exportAsCsv: "\\u5BFC\\u51FA\\u4E3A CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8BD1\\u6587"
      }
    },
    settings: {
      title: "\\u8BBE\\u7F6E",
      theme: "\\u4E3B\\u9898",
      language: "\\u8BED\\u8A00",
      relatedSettings: "\\u76F8\\u5173\\u8BBE\\u7F6E",
      filterRules: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u89C4\\u5219",
      filters: {
        numbers: "\\u8FC7\\u6EE4\\u6570\\u5B57/\\u8D27\\u5E01",
        chinese: "\\u8FC7\\u6EE4\\u7EAF\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u8FC7\\u6EE4\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u8FC7\\u6EE4\\u7EAF\\u8868\\u60C5\\u7B26\\u53F7\\u6587\\u672C",
        symbols: "\\u8FC7\\u6EE4\\u7EAF\\u7B26\\u53F7\\u6587\\u672C",
        term: "\\u8FC7\\u6EE4\\u7279\\u5B9A\\u672F\\u8BED",
        single_letter: "\\u8FC7\\u6EE4\\u5355\\u4E2A\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u8FC7\\u6EE4\\u91CD\\u590D\\u5B57\\u7B26",
        file_paths: "\\u8FC7\\u6EE4\\u6587\\u4EF6\\u8DEF\\u5F84",
        hex_color_codes: "\\u8FC7\\u6EE4\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801",
        email_addresses: "\\u8FC7\\u6EE4\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740",
        uuids: "\\u8FC7\\u6EE4 UUID",
        git_commit_hashes: "\\u8FC7\\u6EE4 Git \\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C",
        website_urls: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        website_urls_title: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        shorthand_numbers: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57",
        shorthand_numbers_title: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57"
      },
      display: {
        show_fab: "\\u663E\\u793A\\u60AC\\u6D6E\\u6309\\u94AE",
        fab_position: "\\u60AC\\u6D6E\\u6309\\u94AE\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u53F3\\u4E0B\\u89D2",
          top_right: "\\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u663E\\u793A\\u884C\\u53F7",
        show_statistics: "\\u663E\\u793A\\u7EDF\\u8BA1\\u4FE1\\u606F",
        enable_word_wrap: "\\u542F\\u7528\\u81EA\\u52A8\\u6362\\u884C",
        text_truncation_limit: "\\u542F\\u7528\\u6587\\u672C\\u622A\\u65AD\\u9650\\u5236",
        character_limit: "\\u5B57\\u7B26\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6807\\u9898\\u4E2D\\u542F\\u7528\\u626B\\u63CF\\u8BA1\\u6570"
      },
      advanced: {
        enable_debug_logging: "\\u542F\\u7528\\u8C03\\u8BD5\\u65E5\\u5FD7\\u8BB0\\u5F55"
      },
      panel: {
        title: "\\u8BBE\\u7F6E\\u9762\\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6D45\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u968F\\u7CFB\\u7EDF"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u626B\\u63CF",
      session: "\\u4F1A\\u8BDD\\u626B\\u63CF",
      stagedCount: "\\u5DF2\\u6682\\u5B58:",
      elementFinished: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      startSession: "\\u5F00\\u59CB\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      stopSession: "\\u505C\\u6B62\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      finished: "\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      sessionStarted: "\\u4F1A\\u8BDD\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      sessionInProgress: "\\u626B\\u63CF\\u8FDB\\u884C\\u4E2D...",
      truncationWarning: "\\u4E3A\\u4FDD\\u6301\\u754C\\u9762\\u6D41\\u7545\\uFF0C\\u6B64\\u5904\\u4EC5\\u663E\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u5BFC\\u51FA\\u540E\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u5185\\u5BB9\\u3002"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      scanCountSession: "\\u5DF2\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      scanCountStatic: "\\u5171\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      totalCharacters: "\\u603B\\u5B57\\u7B26\\u6570",
      totalLines: "\\u603B\\u884C\\u6570",
      noSummary: "\\u65E0\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u7B26"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u590D\\u5236\\u5230\\u526A\\u8D34\\u677F\\uFF01",
      settingsSaved: "\\u8BBE\\u7F6E\\u5DF2\\u4FDD\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u6001\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6CA1\\u6709\\u53EF\\u590D\\u5236\\u7684\\u5185\\u5BB9\\u3002",
      contentCleared: "\\u5185\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u626B\\u63CF\\u5931\\u8D25\\u3002",
      elementScanStarted: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      cspWorkerWarning: "\\u56E0\\u7F51\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u6362\\u81F3\\u517C\\u5BB9\\u626B\\u63CF\\u6A21\\u5F0F\\u3002"
    },
    placeholders: {
      click: "\\u70B9\\u51FB ",
      dynamicScan: "[\\u52A8\\u6001\\u626B\\u63CF]",
      startNewScanSession: " \\u5F00\\u59CB\\u65B0\\u7684\\u626B\\u63CF\\u4F1A\\u8BDD",
      staticScan: "[\\u9759\\u6001\\u626B\\u63CF]",
      performOneTimeScan: " \\u6267\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u786E\\u5B9A\\u8981\\u6E05\\u9664\\u5185\\u5BB9\\u5417\\uFF1F\\u6B64\\u64CD\\u4F5C\\u65E0\\u6CD5\\u64A4\\u9500\\u3002"
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      dynamic_scan: "\\u52A8\\u6001\\u626B\\u63CF",
      static_scan: "\\u9759\\u6001\\u626B\\u63CF",
      element_scan: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF",
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9879\\u626B\\u63CF\\u6B63\\u5728\\u8FDB\\u884C\\u4E2D"
      },
      filters: {
        title: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u5668\\u8BF4\\u660E",
        numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6570\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6570\\u70B9(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8D27\\u5E01\\u7B26\\u53F7($, \\u20AC, \\xA3, \\xA5)\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6C49\\u5B57\\u548C\\u7A7A\\u683C\\u7EC4\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6807\\u70B9\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        contains_chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u4E2A\\u6C49\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u65E0\\u8BBA\\u5176\\u4ED6\\u5B57\\u7B26\\u662F\\u4EC0\\u4E48\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C06\\u88AB\\u8FC7\\u6EE4)',
        emoji_only: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u4E2A\\u6216\\u591A\\u4E2A\\u8868\\u60C5\\u7B26\\u53F7\\u53CA\\u7A7A\\u683C\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u79CD\\u6807\\u70B9\\u548C\\u7B26\\u53F7\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8BD1\\u7684\\u5E38\\u89C1UI\\u672F\\u8BED\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u5355\\u4E2A</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7EC4\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "A" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "b" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "AB" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        repeating_chars: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u540C\\u4E00\\u4E2A\\u5B57\\u7B26</strong>\\u8FDE\\u7EED\\u91CD\\u590D2\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u89C4\\u5219\\u5C1D\\u8BD5\\u8BC6\\u522B\\u5E76\\u8FC7\\u6EE4\\u6389\\u7C7B\\u4F3C\\u64CD\\u4F5C\\u7CFB\\u7EDF\\u6587\\u4EF6\\u8DEF\\u5F84\\u4E14<strong>\\u5305\\u542B\\u6587\\u4EF6\\u6269\\u5C55\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7F51\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684CSS\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u540E\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7B26\\u5408\\u6807\\u51C6\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u7528\\u552F\\u4E00\\u6807\\u8BC6\\u7B26 (UUID)\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684Git\\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C\\uFF08\\u957F\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u72EC\\u7ACB\\u7684\\u7F51\\u5740</strong>\\u3002\\u5B83\\u8BBE\\u8BA1\\u5F97\\u6BD4\\u8F83\\u4E25\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u94FE\\u63A5\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u89C1\\u901F\\u8BB0\\u540E\\u7F00</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u4E07(m)\\u6216\\u5341\\u4EBF(b)\\u7684\\u6570\\u5B57\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u663E\\u793A\\u8BBE\\u7F6E\\u8BF4\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7F51\\u9875\\u53F3\\u4E0B\\u89D2\\u663E\\u793A<strong>\\u60AC\\u6D6E\\u64CD\\u4F5C\\u6309\\u94AE(FAB)</strong>\\u3002\\u8FD9\\u662F\\u8FDB\\u884C\\u9759\\u6001\\u548C\\u52A8\\u6001\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u94AE\\uFF0C\\u53EF\\u4EE5\\u901A\\u8FC7\\u6CB9\\u7334\\u6269\\u5C55\\u83DC\\u5355\\u4E2D\\u7684\\u8BBE\\u7F6E\\u9762\\u677F\\u91CD\\u65B0\\u542F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u542F\\u7528\\u540E\\uFF0C\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6807\\u9898\\u680F\\u5C06<strong>\\u5B9E\\u65F6\\u663E\\u793A</strong>\\u5F53\\u524D\\u626B\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u603B\\u6587\\u672C\\u9879\\u76EE\\u6570\\u3002\\u8FD9\\u5BF9\\u4E8E\\u76D1\\u63A7\\u957F\\u65F6\\u95F4\\u8FD0\\u884C\\u7684<strong>\\u52A8\\u6001\\u626B\\u63CF</strong>\\u7684\\u8FDB\\u5EA6\\u7279\\u522B\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6587\\u672C\\u533A\\u57DF\\u5DE6\\u4FA7\\u663E\\u793A\\u884C\\u53F7\\u3002\\u5F53\\u60A8\\u9700\\u8981\\u8BA8\\u8BBA\\u6216\\u8BB0\\u5F55\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u65F6\\uFF0C\\u8FD9\\u63D0\\u4F9B\\u4E86\\u4E00\\u4E2A<strong>\\u7CBE\\u786E\\u7684\\u53C2\\u8003\\u70B9</strong>\\u3002",
        show_statistics: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u5E95\\u90E8\\u7684\\u72B6\\u6001\\u680F\\u4E2D\\u663E\\u793A\\u6709\\u5173\\u63D0\\u53D6\\u5185\\u5BB9\\u7684<strong>\\u5B9E\\u65F6\\u7EDF\\u8BA1\\u6570\\u636E</strong>\\uFF0C\\u5305\\u62EC<strong>\\u603B\\u884C\\u6570</strong>\\u548C<strong>\\u603B\\u5B57\\u7B26\\u6570</strong>\\u3002\\u8FD9\\u6709\\u52A9\\u4E8E\\u60A8\\u5FEB\\u901F\\u8BC4\\u4F30\\u5185\\u5BB9\\u7684\\u4F53\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7ED3\\u679C\\u7A97\\u53E3\\u4E2D\\u957F\\u6587\\u672C\\u884C\\u7684\\u663E\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u542F\\u7528:</strong> \\u957F\\u884C\\u5C06\\u81EA\\u52A8\\u6362\\u884C\\u4EE5\\u9002\\u5E94\\u7A97\\u53E3\\u5BBD\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u957F\\u884C\\u5C06\\u4FDD\\u6301\\u5728\\u5355\\u884C\\uFF0C\\u5E76\\u51FA\\u73B0\\u6C34\\u5E73\\u6EDA\\u52A8\\u6761\\u3002",
        text_truncation_limit: "\\u8FD9\\u662F\\u4E00\\u4E2A<strong>\\u6027\\u80FD\\u4F18\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u811A\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6781\\u957F\\u7684\\u5355\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7F16\\u7801\\u7684\\u56FE\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u4F1A\\u5BFC\\u81F4\\u6D4F\\u89C8\\u5668<strong>\\u5361\\u987F\\u6216\\u65E0\\u54CD\\u5E94</strong>\\u3002<br><br>\\u6B64\\u8BBE\\u7F6E\\u4F1A\\u622A\\u65AD\\u4EFB\\u4F55\\u8D85\\u8FC7\\u6307\\u5B9A\\u957F\\u5EA6\\u7684\\u5355\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u786E\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u7545\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u8FD9\\u4EC5\\u5F71\\u54CD\\u663E\\u793A\\uFF1B\\u5BFC\\u51FA\\u7684\\u6587\\u4EF6\\u4ECD\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65AD\\u7684\\u5185\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9AD8\\u7EA7\\u8BBE\\u7F6E\\u8BF4\\u660E",
        enable_debug_logging: "\\u542F\\u7528\\u540E\\uFF0C\\u811A\\u672C\\u4F1A\\u5C06\\u8BE6\\u7EC6\\u7684\\u5185\\u90E8\\u72B6\\u6001\\u3001\\u6267\\u884C\\u6B65\\u9AA4\\u548C\\u9519\\u8BEF\\u4FE1\\u606F\\u8F93\\u51FA\\u5230\\u6D4F\\u89C8\\u5668\\u7684<strong>\\u5F00\\u53D1\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u6253\\u5F00\\uFF09\\u3002\\u8FD9\\u4E3B\\u8981\\u4F9B\\u5F00\\u53D1\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8BE6\\u7EC6\\u9519\\u8BEF\\u62A5\\u544A\\u7684\\u7528\\u6237\\u4F7F\\u7528\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u811A\\u672C-\\u8C03\\u8BD5]",
      language: {
        switched: "\\u8BED\\u8A00\\u5DF2\\u5207\\u6362\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8BED\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8BBE\\u7F6E '{{key}}' \\u5DF2\\u4ECE '{{oldValue}}' \\u66F4\\u6539\\u4E3A '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u542F\\u7528",
          disabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u8BBE\\u7F6E\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u8BBE\\u7F6E\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u4FDD\\u5B58\\u8BBE\\u7F6E..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u4FDD\\u5B58\\u7684\\u8BBE\\u7F6E\\u65F6\\u51FA\\u9519\\uFF1A",
        invalidObject: "\\u8BD5\\u56FE\\u4E3A\\u8BBE\\u7F6E\\u4FDD\\u5B58\\u4E00\\u4E2A\\u65E0\\u6548\\u5BF9\\u8C61\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u8FC7\\u6EE4: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u6B63\\u5728\\u4E3B\\u7EBF\\u7A0B\\u4E2D\\u5F00\\u59CB\\u5904\\u7406...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u626B\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u5F00\\u59CB\\u6267\\u884C\\uFF0C\\u5C1D\\u8BD5\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u5904\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u6761\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u626B\\u63CF Worker] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002\\u6B63\\u5728\\u53D1\\u56DE\\u4E3B\\u7EBF\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u626B\\u63CF] Web Worker \\u5DF2\\u521B\\u5EFA\\uFF0C\\u6B63\\u5728\\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u8FDB\\u884C\\u5904\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        domObserver: {
          stopped: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u5DF2\\u505C\\u6B62\\u76D1\\u542C DOM \\u53D8\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u4F1A\\u8BDD\\u626B\\u63CF - \\u5907\\u9009] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u4F1A\\u8BDD\\u626B\\u63CF - \\u5907\\u9009] \\u6570\\u636E\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u4F1A\\u8BDD\\u626B\\u63CF Worker]",
          starting: "\\u4F1A\\u8BDD\\u626B\\u63CF\\uFF1A\\u6B63\\u5728\\u5C1D\\u8BD5\\u542F\\u52A8 Web Worker...",
          initFailed: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          initialized: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u53D1\\u9001 {{count}} \\u6761\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u5F00\\u59CB\\u4F1A\\u8BDD\\u3002",
          initSyncError: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          clearCommandSent: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u53D1\\u9001\\u81F3 worker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u590D\\u5236\\u4E86 {{count}} \\u4E2A\\u5B57\\u7B26\\u3002",
          nothingToCopy: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u4F46\\u6CA1\\u6709\\u5185\\u5BB9\\u53EF\\u590D\\u5236\\u6216\\u6309\\u94AE\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u4F1A\\u8BDD\\u626B\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8C03\\u7528\\u56DE\\u8C03..."
          },
          quickScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u5FEB\\u901F\\u626B\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u7528\\u6237\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u4E3B\\u6A21\\u6001\\u6846...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u4E3B\\u6A21\\u6001\\u6846...",
          scanFailed: "\\u9759\\u6001\\u626B\\u63CF\\u5931\\u8D25: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5185\\u5BB9\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\u3002"
        }
      },
      exporter: {
        buttonClicked: "\\u5BFC\\u51FA\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u5E76\\u751F\\u6210CSV\\u65F6\\u51FA\\u9519: {{error}}",
        fileExported: "\\u6587\\u4EF6\\u5DF2\\u5BFC\\u51FA: {{filename}}",
        noContent: "\\u65E0\\u5185\\u5BB9\\u53EF\\u5BFC\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u5BFC\\u51FA\\u683C\\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8BF7\\u6C42\\u4F1A\\u8BDD\\u626B\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        exportingQuickScanData: "\\u6B63\\u5728\\u5BFC\\u51FA\\u5FEB\\u901F\\u626B\\u63CF\\u6A21\\u5F0F\\u5185\\u5B58\\u4E2D\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        inIframe: "\\u811A\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u8FC7\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u811A\\u672C\\u521D\\u59CB\\u5316\\u5F00\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8BBE\\u7F6E\\u5DF2\\u52A0\\u8F7D:"
      },
      dom: {
        ttpCreationError: "\\u521B\\u5EFA Trusted Type \\u7B56\\u7565\\u5931\\u8D25:",
        svgParseError: "SVG \\u5B57\\u7B26\\u4E32\\u65E0\\u6548\\u6216\\u89E3\\u6790\\u5931\\u8D25:"
      },
      elementScan: {
        starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
        stopping: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6DFB\\u52A0\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u79FB\\u9664\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        stateReset: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u72B6\\u6001\\u5DF2\\u91CD\\u7F6E\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9009\\u62E9\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u60AC\\u505C\\u4E8E <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u952E\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u8FDB\\u5165\\u8C03\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C42\\u7EA7\\u8DEF\\u5F84\\u5DF2\\u6784\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u4E3A\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8C03\\u6574\\u9009\\u62E9\\u5C42\\u7EA7\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9009\\u62E9\\u5DF2\\u786E\\u8BA4\\uFF0C\\u6B63\\u5728\\u4ECE <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u6682\\u5B58\\u3002\\u603B\\u6570\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u786E\\u8BA4\\u9009\\u62E9\\u3002\\u6B63\\u5728\\u5904\\u7406 {{count}} \\u4E2A\\u5DF2\\u6682\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u4ECE\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u6761\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u786E\\u8BA4\\u5931\\u8D25\\uFF1A\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u76EE\\u6807\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u68C0\\u6D4B\\u5230\\u53F3\\u952E\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u5904\\u7406\\u8FC7\\u7A0B\\u4E2D\\u53D1\\u751F\\u9519\\u8BEF: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u4E3A {{count}} \\u4E2A\\u7236\\u5143\\u7D20\\u6DFB\\u52A0\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u6B63\\u5728\\u542F\\u52A8...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002",
          initFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u6D4F\\u89C8\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u9519\\u8BEF: {{error}}"
        },
        switchToFallback: "\\u6B63\\u5728\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u9996\\u6B21\\u521B\\u5EFA\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u4E3A <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u521B\\u5EFA\\u8C03\\u6574\\u5DE5\\u5177\\u680F\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u680F\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6ED1\\u5757\\u5C42\\u7EA7\\u53D8\\u4E3A {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u91CD\\u65B0\\u9009\\u62E9\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        stageClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u6682\\u5B58\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u53D6\\u6D88\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u786E\\u8BA4\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        dragStarted: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u5F00\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u7ED3\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u680F\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u8C03\\u51FD\\u6570\\u51FA\\u9519:"
      },
      trustedTypes: {
        workerPolicyError: "\\u521B\\u5EFA Trusted Types worker \\u7B56\\u7565\\u5931\\u8D25:",
        htmlPolicyError: "\\u521B\\u5EFA Trusted Types HTML \\u7B56\\u7565\\u5931\\u8D25:",
        defaultWorkerPolicyWarning: "\\u7528\\u4E8E worker URL \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u4E8E HTML \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u7B26\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B",
      elementScan: '<p class="tutorial-content">\\u8FD9\\u662F\\u4E00\\u4E2A\\u7528\\u4E8E\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B\\u7684\\u5360\\u4F4D\\u7B26\\u3002\\u652F\\u6301\\u5BCC\\u6587\\u672C\\u683C\\u5F0F\\u3002</p>'
    }
  };
  // src/shared/i18n/zh-TW.json
  var zh_TW_default = {
    common: {
      scan: "\\u6383\\u63CF",
      stop: "\\u505C\\u6B62",
      resume: "\\u6062\\u5FA9",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u8907\\u88FD",
      save: "\\u5132\\u5B58",
      discovered: "\\u5DF2\\u767C\\u73FE:",
      confirm: "\\u78BA\\u8A8D",
      cancel: "\\u53D6\\u6D88",
      export: "\\u532F\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9078\\u64C7",
      stage: "\\u66AB\\u5B58"
    },
    export: {
      exportAsTxt: "\\u532F\\u51FA\\u70BA TXT",
      exportAsJson: "\\u532F\\u51FA\\u70BA JSON",
      exportAsCsv: "\\u532F\\u51FA\\u70BA CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8B6F\\u6587"
      }
    },
    settings: {
      title: "\\u8A2D\\u5B9A",
      theme: "\\u4E3B\\u984C",
      language: "\\u8A9E\\u8A00",
      relatedSettings: "\\u76F8\\u95DC\\u8A2D\\u5B9A",
      filterRules: "\\u5167\\u5BB9\\u904E\\u6FFE\\u898F\\u5247",
      filters: {
        numbers: "\\u904E\\u6FFE\\u6578\\u5B57/\\u8CA8\\u5E63",
        chinese: "\\u904E\\u6FFE\\u7D14\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u904E\\u6FFE\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u904E\\u6FFE\\u7D14\\u8868\\u60C5\\u7B26\\u865F\\u6587\\u672C",
        symbols: "\\u904E\\u6FFE\\u7D14\\u7B26\\u865F\\u6587\\u672C",
        term: "\\u904E\\u6FFE\\u7279\\u5B9A\\u8853\\u8A9E",
        single_letter: "\\u904E\\u6FFE\\u55AE\\u500B\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u904E\\u6FFE\\u91CD\\u8907\\u5B57\\u5143",
        file_paths: "\\u904E\\u6FFE\\u6A94\\u6848\\u8DEF\\u5F91",
        hex_color_codes: "\\u904E\\u6FFE\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC",
        email_addresses: "\\u904E\\u6FFE\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740",
        uuids: "\\u904E\\u6FFE UUID",
        git_commit_hashes: "\\u904E\\u6FFE Git \\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C",
        website_urls: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        website_urls_title: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        shorthand_numbers: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57",
        shorthand_numbers_title: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57"
      },
      display: {
        show_fab: "\\u986F\\u793A\\u61F8\\u6D6E\\u6309\\u9215",
        fab_position: "\\u61F8\\u6D6E\\u6309\\u9215\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u53F3\\u4E0B\\u89D2",
          top_right: "\\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u986F\\u793A\\u884C\\u865F",
        show_statistics: "\\u986F\\u793A\\u7D71\\u8A08\\u8CC7\\u8A0A",
        enable_word_wrap: "\\u555F\\u7528\\u81EA\\u52D5\\u63DB\\u884C",
        text_truncation_limit: "\\u555F\\u7528\\u6587\\u672C\\u622A\\u65B7\\u9650\\u5236",
        character_limit: "\\u5B57\\u5143\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6A19\\u984C\\u4E2D\\u555F\\u7528\\u6383\\u63CF\\u8A08\\u6578"
      },
      advanced: {
        enable_debug_logging: "\\u555F\\u7528\\u5075\\u932F\\u65E5\\u8A8C\\u8A18\\u9304"
      },
      panel: {
        title: "\\u8A2D\\u5B9A\\u9762\\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6DFA\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u96A8\\u7CFB\\u7D71"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u6383\\u63CF",
      session: "\\u6703\\u8A71\\u6383\\u63CF",
      stagedCount: "\\u5DF2\\u66AB\\u5B58:",
      elementFinished: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      startSession: "\\u958B\\u59CB\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      stopSession: "\\u505C\\u6B62\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      finished: "\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      sessionStarted: "\\u6703\\u8A71\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      sessionInProgress: "\\u6383\\u63CF\\u9032\\u884C\\u4E2D...",
      truncationWarning: "\\u70BA\\u4FDD\\u6301\\u4ECB\\u9762\\u6D41\\u66A2\\uFF0C\\u6B64\\u8655\\u50C5\\u986F\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u532F\\u51FA\\u5F8C\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u5167\\u5BB9\\u3002"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      scanCountSession: "\\u5DF2\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      scanCountStatic: "\\u5171\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      totalCharacters: "\\u7E3D\\u5B57\\u5143\\u6578",
      totalLines: "\\u7E3D\\u884C\\u6578",
      noSummary: "\\u7121\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u5143"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u8907\\u88FD\\u5230\\u526A\\u8CBC\\u7C3F\\uFF01",
      settingsSaved: "\\u8A2D\\u5B9A\\u5DF2\\u5132\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u614B\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6C92\\u6709\\u53EF\\u8907\\u88FD\\u7684\\u5167\\u5BB9\\u3002",
      contentCleared: "\\u5167\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u6383\\u63CF\\u5931\\u6557\\u3002",
      elementScanStarted: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      cspWorkerWarning: "\\u56E0\\u7DB2\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u63DB\\u81F3\\u76F8\\u5BB9\\u6383\\u63CF\\u6A21\\u5F0F\\u3002"
    },
    placeholders: {
      click: "\\u9EDE\\u64CA ",
      dynamicScan: "[\\u52D5\\u614B\\u6383\\u63CF]",
      startNewScanSession: " \\u958B\\u59CB\\u65B0\\u7684\\u6383\\u63CF\\u6703\\u8A71",
      staticScan: "[\\u975C\\u614B\\u6383\\u63CF]",
      performOneTimeScan: " \\u57F7\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u78BA\\u5B9A\\u8981\\u6E05\\u9664\\u5167\\u5BB9\\u55CE\\uFF1F\\u6B64\\u64CD\\u4F5C\\u7121\\u6CD5\\u64A4\\u92B7\\u3002"
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      dynamic_scan: "\\u52D5\\u614B\\u6383\\u63CF",
      static_scan: "\\u975C\\u614B\\u6383\\u63CF",
      element_scan: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF",
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9805\\u6383\\u63CF\\u6B63\\u5728\\u9032\\u884C\\u4E2D"
      },
      filters: {
        title: "\\u5167\\u5BB9\\u904E\\u6FFE\\u5668\\u8AAA\\u660E",
        numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6578\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6578\\u9EDE(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8CA8\\u5E63\\u7B26\\u865F($, \\u20AC, \\xA3, \\xA5)\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6F22\\u5B57\\u548C\\u7A7A\\u683C\\u7D44\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6A19\\u9EDE\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        contains_chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u500B\\u6F22\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u7121\\u8AD6\\u5176\\u4ED6\\u5B57\\u5143\\u662F\\u4EC0\\u9EBC\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C07\\u88AB\\u904E\\u6FFE)',
        emoji_only: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u500B\\u6216\\u591A\\u500B\\u8868\\u60C5\\u7B26\\u865F\\u53CA\\u7A7A\\u683C\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u7A2E\\u6A19\\u9EDE\\u548C\\u7B26\\u865F\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8B6F\\u7684\\u5E38\\u898BUI\\u8853\\u8A9E\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u55AE\\u500B</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7D44\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "A" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "b" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "AB" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        repeating_chars: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u540C\\u4E00\\u500B\\u5B57\\u5143</strong>\\u9023\\u7E8C\\u91CD\\u89072\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u898F\\u5247\\u5617\\u8A66\\u8B58\\u5225\\u4E26\\u904E\\u6FFE\\u6389\\u985E\\u4F3C\\u4F5C\\u696D\\u7CFB\\u7D71\\u6A94\\u6848\\u8DEF\\u5F91\\u4E14<strong>\\u5305\\u542B\\u6A94\\u6848\\u526F\\u6A94\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7DB2\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684CSS\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u5F8C\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7B26\\u5408\\u6A19\\u6E96\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u7528\\u552F\\u4E00\\u8B58\\u5225\\u78BC (UUID)\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684Git\\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C\\uFF08\\u9577\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u7368\\u7ACB\\u7684\\u7DB2\\u5740</strong>\\u3002\\u5B83\\u8A2D\\u8A08\\u5F97\\u6BD4\\u8F03\\u56B4\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u9023\\u7D50\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u898B\\u901F\\u8A18\\u5F8C\\u7DB4</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u842C(m)\\u6216\\u5341\\u5104(b)\\u7684\\u6578\\u5B57\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u986F\\u793A\\u8A2D\\u5B9A\\u8AAA\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7DB2\\u9801\\u53F3\\u4E0B\\u89D2\\u986F\\u793A<strong>\\u61F8\\u6D6E\\u64CD\\u4F5C\\u6309\\u9215(FAB)</strong>\\u3002\\u9019\\u662F\\u9032\\u884C\\u975C\\u614B\\u548C\\u52D5\\u614B\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u9215\\uFF0C\\u53EF\\u4EE5\\u900F\\u904E\\u6CB9\\u7334\\u64F4\\u5145\\u5957\\u4EF6\\u9078\\u55AE\\u4E2D\\u7684\\u8A2D\\u5B9A\\u9762\\u677F\\u91CD\\u65B0\\u555F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u555F\\u7528\\u5F8C\\uFF0C\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6A19\\u984C\\u5217\\u5C07<strong>\\u5373\\u6642\\u986F\\u793A</strong>\\u76EE\\u524D\\u6383\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u7E3D\\u6587\\u672C\\u9805\\u76EE\\u6578\\u3002\\u9019\\u5C0D\\u65BC\\u76E3\\u63A7\\u9577\\u6642\\u9593\\u57F7\\u884C\\u7684<strong>\\u52D5\\u614B\\u6383\\u63CF</strong>\\u7684\\u9032\\u5EA6\\u7279\\u5225\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6587\\u672C\\u5340\\u57DF\\u5DE6\\u5074\\u986F\\u793A\\u884C\\u865F\\u3002\\u7576\\u60A8\\u9700\\u8981\\u8A0E\\u8AD6\\u6216\\u8A18\\u9304\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u6642\\uFF0C\\u9019\\u63D0\\u4F9B\\u4E86\\u4E00\\u500B<strong>\\u7CBE\\u78BA\\u7684\\u53C3\\u8003\\u9EDE</strong>\\u3002",
        show_statistics: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u5E95\\u90E8\\u7684\\u72C0\\u614B\\u5217\\u4E2D\\u986F\\u793A\\u6709\\u95DC\\u63D0\\u53D6\\u5167\\u5BB9\\u7684<strong>\\u5373\\u6642\\u7D71\\u8A08\\u6578\\u64DA</strong>\\uFF0C\\u5305\\u62EC<strong>\\u7E3D\\u884C\\u6578</strong>\\u548C<strong>\\u7E3D\\u5B57\\u5143\\u6578</strong>\\u3002\\u9019\\u6709\\u52A9\\u65BC\\u60A8\\u5FEB\\u901F\\u8A55\\u4F30\\u5167\\u5BB9\\u7684\\u9AD4\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7D50\\u679C\\u8996\\u7A97\\u4E2D\\u9577\\u6587\\u672C\\u884C\\u7684\\u986F\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u555F\\u7528:</strong> \\u9577\\u884C\\u5C07\\u81EA\\u52D5\\u63DB\\u884C\\u4EE5\\u9069\\u61C9\\u8996\\u7A97\\u5BEC\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u9577\\u884C\\u5C07\\u4FDD\\u6301\\u5728\\u55AE\\u884C\\uFF0C\\u4E26\\u51FA\\u73FE\\u6C34\\u5E73\\u6372\\u8EF8\\u3002",
        text_truncation_limit: "\\u9019\\u662F\\u4E00\\u500B<strong>\\u6548\\u80FD\\u512A\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u8173\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6975\\u9577\\u7684\\u55AE\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7DE8\\u78BC\\u7684\\u5716\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u6703\\u5C0E\\u81F4\\u700F\\u89BD\\u5668<strong>\\u5361\\u9813\\u6216\\u7121\\u56DE\\u61C9</strong>\\u3002<br><br>\\u6B64\\u8A2D\\u5B9A\\u6703\\u622A\\u65B7\\u4EFB\\u4F55\\u8D85\\u904E\\u6307\\u5B9A\\u9577\\u5EA6\\u7684\\u55AE\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u78BA\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u66A2\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u9019\\u50C5\\u5F71\\u97FF\\u986F\\u793A\\uFF1B\\u532F\\u51FA\\u7684\\u6A94\\u6848\\u4ECD\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65B7\\u7684\\u5167\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9032\\u968E\\u8A2D\\u5B9A\\u8AAA\\u660E",
        enable_debug_logging: "\\u555F\\u7528\\u5F8C\\uFF0C\\u8173\\u672C\\u6703\\u5C07\\u8A73\\u7D30\\u7684\\u5167\\u90E8\\u72C0\\u614B\\u3001\\u57F7\\u884C\\u6B65\\u9A5F\\u548C\\u932F\\u8AA4\\u8A0A\\u606F\\u8F38\\u51FA\\u5230\\u700F\\u89BD\\u5668\\u7684<strong>\\u958B\\u767C\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u958B\\u555F\\uFF09\\u3002\\u9019\\u4E3B\\u8981\\u4F9B\\u958B\\u767C\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8A73\\u7D30\\u932F\\u8AA4\\u5831\\u544A\\u7684\\u4F7F\\u7528\\u8005\\u4F7F\\u7528\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u8173\\u672C-\\u5075\\u932F]",
      language: {
        switched: "\\u8A9E\\u8A00\\u5DF2\\u5207\\u63DB\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8A9E\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8A2D\\u5B9A '{{key}}' \\u5DF2\\u5F9E '{{oldValue}}' \\u8B8A\\u66F4\\u70BA '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u555F\\u7528",
          disabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u8A2D\\u5B9A\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u8A2D\\u5B9A\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u5132\\u5B58\\u8A2D\\u5B9A..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u5132\\u5B58\\u7684\\u8A2D\\u5B9A\\u6642\\u51FA\\u932F\\uFF1A",
        invalidObject: "\\u8A66\\u5716\\u70BA\\u8A2D\\u5B9A\\u5132\\u5B58\\u4E00\\u500B\\u7121\\u6548\\u7269\\u4EF6\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u904E\\u6FFE: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u6B63\\u5728\\u4E3B\\u7DDA\\u7A0B\\u4E2D\\u958B\\u59CB\\u8655\\u7406...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u6383\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u958B\\u59CB\\u57F7\\u884C\\uFF0C\\u5617\\u8A66\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u8655\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u689D\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u6383\\u63CF Worker] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002\\u6B63\\u5728\\u767C\\u56DE\\u4E3B\\u7DDA\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u6383\\u63CF] Web Worker \\u5DF2\\u5EFA\\u7ACB\\uFF0C\\u6B63\\u5728\\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u9032\\u884C\\u8655\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u6703\\u8A71\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        domObserver: {
          stopped: "[\\u6703\\u8A71\\u6383\\u63CF] \\u5DF2\\u505C\\u6B62\\u76E3\\u807D DOM \\u8B8A\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u6703\\u8A71\\u6383\\u63CF - \\u5099\\u9078] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u6703\\u8A71\\u6383\\u63CF - \\u5099\\u9078] \\u8CC7\\u6599\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u6703\\u8A71\\u6383\\u63CF Worker]",
          starting: "\\u6703\\u8A71\\u6383\\u63CF\\uFF1A\\u6B63\\u5728\\u5617\\u8A66\\u555F\\u52D5 Web Worker...",
          initFailed: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u6703\\u8A71\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          initialized: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u767C\\u9001 {{count}} \\u689D\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u958B\\u59CB\\u6703\\u8A71\\u3002",
          initSyncError: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          clearCommandSent: "[\\u6703\\u8A71\\u6383\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u767C\\u9001\\u81F3 worker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u8907\\u88FD\\u4E86 {{count}} \\u500B\\u5B57\\u5143\\u3002",
          nothingToCopy: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u4F46\\u6C92\\u6709\\u5167\\u5BB9\\u53EF\\u8907\\u88FD\\u6216\\u6309\\u9215\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u6703\\u8A71\\u6383\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8ABF\\u7528\\u56DE\\u547C..."
          },
          quickScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u5FEB\\u901F\\u6383\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u4F7F\\u7528\\u8005\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u4E3B\\u6A21\\u614B\\u6846...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u4E3B\\u6A21\\u614B\\u6846...",
          scanFailed: "\\u975C\\u614B\\u6383\\u63CF\\u5931\\u6557: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5167\\u5BB9\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\u3002"
        }
      },
      exporter: {
        buttonClicked: "\\u532F\\u51FA\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u4E26\\u7522\\u751FCSV\\u6642\\u51FA\\u932F: {{error}}",
        fileExported: "\\u6A94\\u6848\\u5DF2\\u532F\\u51FA: {{filename}}",
        noContent: "\\u7121\\u5167\\u5BB9\\u53EF\\u532F\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u532F\\u51FA\\u683C\\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8ACB\\u6C42\\u6703\\u8A71\\u6383\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        exportingQuickScanData: "\\u6B63\\u5728\\u532F\\u51FA\\u5FEB\\u901F\\u6383\\u63CF\\u6A21\\u5F0F\\u8A18\\u61B6\\u9AD4\\u4E2D\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        inIframe: "\\u8173\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u904E\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u8173\\u672C\\u521D\\u59CB\\u5316\\u958B\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8A2D\\u5B9A\\u5DF2\\u8F09\\u5165:"
      },
      dom: {
        ttpCreationError: "\\u5EFA\\u7ACB Trusted Type \\u7B56\\u7565\\u5931\\u6557:",
        svgParseError: "SVG \\u5B57\\u4E32\\u7121\\u6548\\u6216\\u89E3\\u6790\\u5931\\u6557:"
      },
      elementScan: {
        starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
        stopping: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u65B0\\u589E\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u79FB\\u9664\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        stateReset: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u72C0\\u614B\\u5DF2\\u91CD\\u8A2D\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9078\\u64C7\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u61F8\\u505C\\u65BC <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u9375\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u9032\\u5165\\u8ABF\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C64\\u7D1A\\u8DEF\\u5F91\\u5DF2\\u69CB\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u70BA\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8ABF\\u6574\\u9078\\u64C7\\u5C64\\u7D1A\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9078\\u64C7\\u5DF2\\u78BA\\u8A8D\\uFF0C\\u6B63\\u5728\\u5F9E <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u66AB\\u5B58\\u3002\\u7E3D\\u6578\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u78BA\\u8A8D\\u9078\\u64C7\\u3002\\u6B63\\u5728\\u8655\\u7406 {{count}} \\u500B\\u5DF2\\u66AB\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u5F9E\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u689D\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u78BA\\u8A8D\\u5931\\u6557\\uFF1A\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u76EE\\u6A19\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u5075\\u6E2C\\u5230\\u53F3\\u9375\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u8655\\u7406\\u904E\\u7A0B\\u4E2D\\u767C\\u751F\\u932F\\u8AA4: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u70BA {{count}} \\u500B\\u7236\\u5143\\u7D20\\u65B0\\u589E\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u6B63\\u5728\\u555F\\u52D5...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002",
          initFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u700F\\u89BD\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u932F\\u8AA4: {{error}}"
        },
        switchToFallback: "\\u6B63\\u5728\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u9996\\u6B21\\u5EFA\\u7ACB\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u70BA <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u5EFA\\u7ACB\\u8ABF\\u6574\\u5DE5\\u5177\\u5217\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u5217\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6ED1\\u687F\\u5C64\\u7D1A\\u8B8A\\u70BA {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u91CD\\u65B0\\u9078\\u64C7\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        stageClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u66AB\\u5B58\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u6383\\u89C0UI\\uFF1A\\u300C\\u53D6\\u6D88\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u78BA\\u8A8D\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        dragStarted: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u958B\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u7D50\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u5217\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u547C\\u51FD\\u6578\\u51FA\\u932F:"
      },
      trustedTypes: {
        workerPolicyError: "\\u5EFA\\u7ACB Trusted Types worker \\u7B56\\u7565\\u5931\\u6557:",
        htmlPolicyError: "\\u5EFA\\u7ACB Trusted Types HTML \\u7B56\\u7565\\u5931\\u6557:",
        defaultWorkerPolicyWarning: "\\u7528\\u65BC worker URL \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u65BC HTML \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u5B78",
      elementScan: '<p class="tutorial-content">\\u9019\\u662F\\u4E00\\u500B\\u7528\\u65BC\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u5B78\\u7684\\u4F54\\u4F4D\\u7B26\\u3002\\u652F\\u63F4\\u5BCC\\u6587\\u672C\\u683C\\u5F0F\\u3002</p>'
    }
  };
  // src/shared/i18n/management/languages.js
  var supportedLanguages = [
    { code: "en", name: "English" },
    { code: "zh-CN", name: "\\u7B80\\u4F53\\u4E2D\\u6587" },
    { code: "zh-TW", name: "\\u7E41\\u9AD4\\u4E2D\\u6587" }
  ];
  // src/shared/i18n/index.js
  var translationModules = {
    en: en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
  var translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
      acc[lang.code] = translationModules[lang.code];
    }
    return acc;
  }, {});
  var currentTranslations = translations.en;
  function t(key, replacements) {
    let value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    if (value === void 0) {
      return key;
    }
    if (replacements) {
      Object.keys(replacements).forEach((placeholder) => {
        const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
        value = value.replace(regex, replacements[placeholder]);
      });
    }
    return value;
  }
  function getAvailableLanguages() {
    return supportedLanguages.map((lang) => ({
      value: lang.code,
      label: lang.name
    }));
  }
  // src/shared/utils/ignoredTerms.js
  var IGNORED_TERMS = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript",
    "TypeScript",
    "Hugging Face",
    "Google",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "OpenAI",
    "ChatGPT",
    "API",
    "Glossary of computer science",
    "HTML",
    "CSS",
    "JSON",
    "XML",
    "HTTP",
    "HTTPS",
    "URL",
    "IP address",
    "DNS",
    "CPU",
    "GPU",
    "RAM",
    "SSD",
    "USB",
    "Wi-Fi",
    "Bluetooth",
    "VPN",
    "AI"
  ];
  var ignoredTerms_default = IGNORED_TERMS;
  // src/assets/icons/themeIcon.js
  var themeIcon = \`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>\`;
  // src/assets/icons/languageIcon.js
  var languageIcon_default = \`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>\`;
  // src/assets/icons/infoIcon.js
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
  // src/features/settings/config.js
  var selectSettingsDefinitions = [
    {
      id: "theme-select",
      key: "theme",
      label: "settings.theme",
      icon: themeIcon,
      options: [
        { value: "light", label: "settings.themes.light" },
        { value: "dark", label: "settings.themes.dark" },
        { value: "system", label: "settings.themes.system" }
      ]
    },
    {
      id: "language-select",
      key: "language",
      label: "settings.language",
      icon: languageIcon_default,
      // \u76F4\u63A5\u4ECE i18n \u6A21\u5757\u83B7\u53D6\u8BED\u8A00\u5217\u8868\uFF0C\u5176\u6807\u7B7E\u5DF2\u7ECF\u662F\u539F\u751F\u540D\u79F0\uFF0C\u65E0\u9700\u518D\u7FFB\u8BD1\u3002
      options: getAvailableLanguages()
    }
  ];
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "settings.filters.numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.numbers", text: "tooltip.filters.numbers" } },
    { id: "filter-chinese", key: "chinese", label: "settings.filters.chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.chinese", text: "tooltip.filters.chinese" } },
    { id: "filter-contains-chinese", key: "containsChinese", label: "settings.filters.contains_chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.contains_chinese", text: "tooltip.filters.contains_chinese" } },
    { id: "filter-emoji-only", key: "emojiOnly", label: "settings.filters.emoji_only", tooltip: { titleIcon: infoIcon, title: "settings.filters.emoji_only", text: "tooltip.filters.emoji_only" } },
    { id: "filter-symbols", key: "symbols", label: "settings.filters.symbols", tooltip: { titleIcon: infoIcon, title: "settings.filters.symbols", text: "tooltip.filters.symbols" } },
    { id: "filter-term", key: "termFilter", label: "settings.filters.term", tooltip: { titleIcon: infoIcon, title: "settings.filters.term", text: "tooltip.filters.term" } },
    { id: "filter-single-letter", key: "singleLetter", label: "settings.filters.single_letter", tooltip: { titleIcon: infoIcon, title: "settings.filters.single_letter", text: "tooltip.filters.single_letter" } },
    {
      id: "filter-repeating-chars",
      key: "repeatingChars",
      label: "settings.filters.repeating_chars",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.repeating_chars",
        text: "tooltip.filters.repeating_chars"
      }
    },
    { id: "filter-file-paths", key: "filePath", label: "settings.filters.file_paths", tooltip: { titleIcon: infoIcon, title: "settings.filters.file_paths", text: "tooltip.filters.file_paths" } },
    { id: "filter-hex-colors", key: "hexColor", label: "settings.filters.hex_color_codes", tooltip: { titleIcon: infoIcon, title: "settings.filters.hex_color_codes", text: "tooltip.filters.hex_color_codes" } },
    { id: "filter-emails", key: "email", label: "settings.filters.email_addresses", tooltip: { titleIcon: infoIcon, title: "settings.filters.email_addresses", text: "tooltip.filters.email_addresses" } },
    { id: "filter-uuids", key: "uuid", label: "settings.filters.uuids", tooltip: { titleIcon: infoIcon, title: "settings.filters.uuids", text: "tooltip.filters.uuids" } },
    { id: "filter-git-hashes", key: "gitCommitHash", label: "settings.filters.git_commit_hashes", tooltip: { titleIcon: infoIcon, title: "settings.filters.git_commit_hashes", text: "tooltip.filters.git_commit_hashes" } },
    { id: "filter-website-urls", key: "websiteUrl", label: "settings.filters.website_urls", tooltip: { titleIcon: infoIcon, title: "settings.filters.website_urls_title", text: "tooltip.filters.website_urls" } },
    { id: "filter-shorthand-numbers", key: "shorthandNumber", label: "settings.filters.shorthand_numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.shorthand_numbers_title", text: "tooltip.filters.shorthand_numbers" } }
  ];
  // src/shared/utils/filterLogic.js
  var filterConfigMap = new Map(filterDefinitions.map((def) => [def.key, def.label]));
  var ruleChecks = /* @__PURE__ */ new Map([
    ["numbers", {
      regex: /^[$\\\u20AC\\\xA3\\\xA5\\d,.\\s]+$/,
      label: filterConfigMap.get("numbers")
    }],
    ["chinese", {
      regex: /^[\\u4e00-\\u9fa5\\s]+$/u,
      label: filterConfigMap.get("chinese")
    }],
    ["containsChinese", {
      regex: /[\\u4e00-\\u9fa5]/u,
      label: filterConfigMap.get("containsChinese")
    }],
    ["emojiOnly", {
      regex: /^[\\p{Emoji}\\s]+$/u,
      label: filterConfigMap.get("emojiOnly")
    }],
    ["symbols", {
      // \u8FD9\u4E2A\u903B\u8F91\u6BD4\u8F83\u7279\u6B8A\uFF0C\u662F\u201C\u4E0D\u5305\u542B\u5B57\u6BCD\u6216\u6570\u5B57\u201D\uFF0C\u6240\u4EE5\u6211\u4EEC\u7528\u4E00\u4E2A\u51FD\u6570\u6765\u5904\u7406
      test: (text) => !/[\\p{L}\\p{N}]/u.test(text),
      label: filterConfigMap.get("symbols")
    }],
    ["termFilter", {
      test: (text) => ignoredTerms_default.includes(text),
      label: filterConfigMap.get("termFilter")
    }],
    ["singleLetter", {
      regex: /^[a-zA-Z]$/,
      label: filterConfigMap.get("singleLetter")
    }],
    ["repeatingChars", {
      regex: /^\\s*(.)\\1+\\s*$/,
      label: filterConfigMap.get("repeatingChars")
    }],
    ["filePath", {
      regex: /^(?:[a-zA-Z]:\\\\|\\\\\\\\|~|\\.\\.?\\/)[\\w\\-\\.\\/ \\\\]*[\\w\\-\\.]+\\.[\\w]{2,4}$/,
      label: filterConfigMap.get("filePath")
    }],
    ["hexColor", {
      regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
      label: filterConfigMap.get("hexColor")
    }],
    ["email", {
      regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/,
      label: filterConfigMap.get("email")
    }],
    ["uuid", {
      regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      label: filterConfigMap.get("uuid")
    }],
    ["gitCommitHash", {
      regex: /^[0-9a-f]{7,40}$/i,
      label: filterConfigMap.get("gitCommitHash")
    }],
    ["websiteUrl", {
      // \u5339\u914D\u5E38\u89C1\u7684\u7F51\u5740\u683C\u5F0F\uFF0C\u5305\u62EC\u534F\u8BAE\u3001www\u524D\u7F00\u548C\u88F8\u57DF\u540D\uFF0C\u8981\u6C42\u4E25\u683C\u5339\u914D\u6574\u4E2A\u5B57\u7B26\u4E32\u4EE5\u907F\u514D\u8BEF\u4F24\u3002
      regex: /^(?:(?:https?|ftp):\\/\\/)?(?:www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/.*)?$/,
      label: filterConfigMap.get("websiteUrl")
    }],
    ["shorthandNumber", {
      // \u5339\u914D\u5E26k/m/b\u540E\u7F00\u7684\u6570\u5B57\uFF0C\u652F\u6301\u6574\u6570\u3001\u6D6E\u70B9\u6570\u3001\u5927\u5C0F\u5199\u4EE5\u53CA\u53EF\u9009\u7684\u7A7A\u683C\u3002
      regex: /^\\d+(\\.\\d+)?\\s?[kmb]$/i,
      label: filterConfigMap.get("shorthandNumber")
    }]
  ]);
  function shouldFilter(text, filterRules2) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules2[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return t(rule.label);
        }
      }
    }
    return null;
  }
  // src/features/session-scan/worker.js
  var sessionTexts = /* @__PURE__ */ new Set();
  var filterRules = {};
  var translations2 = {};
  var t2 = (key, replacements) => {
    let value = translations2[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach((placeholder) => {
        const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
        value = value.replace(regex, replacements[placeholder]);
      });
    }
    return value;
  };
  function processAndAddText(rawText, logPrefix = "") {
    if (!rawText || typeof rawText !== "string") return false;
    const normalizedText = rawText.normalize("NFC");
    const textForFiltering = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n").trim();
    if (textForFiltering === "") return false;
    const filterResult = shouldFilter(textForFiltering, filterRules);
    if (filterResult) {
      const prefix = logPrefix ? \`\${logPrefix} \` : "";
      console.log(t2("workerLogPrefix"), prefix + t2("textFiltered", { text: textForFiltering, reason: filterResult }));
      return false;
    }
    const originalSize = sessionTexts.size;
    sessionTexts.add(normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n"));
    return sessionTexts.size > originalSize;
  }
  var formatTextsForTranslation = (texts) => {
    if (!texts || texts.length === 0) {
      return "[]";
    }
    const result = texts.map(
      (text) => \`    ["\${text.replace(/"/g, '\\\\"').replace(/\\n/g, "\\\\n")}", ""]\`
    );
    return \`[
\${result.join(",\\n")}
]\`;
  };
  self.onmessage = (event) => {
    const { type, payload } = event.data;
    switch (type) {
      // \u521D\u59CB\u5316\uFF1A\u63A5\u6536\u8FC7\u6EE4\u89C4\u5219
      case "init":
        filterRules = payload.filterRules || {};
        translations2 = payload.translations || {};
        break;
      // \u6570\u636E\u5904\u7406\uFF1A\u63A5\u6536\u4E00\u6279\u539F\u59CB\u6587\u672C\u8FDB\u884C\u5904\u7406
      case "data": {
        const { texts, logPrefix } = payload;
        let changed = false;
        if (Array.isArray(texts)) {
          texts.forEach((text) => {
            if (processAndAddText(text, logPrefix)) {
              changed = true;
            }
          });
        }
        if (changed) {
          self.postMessage({ type: "countUpdated", payload: sessionTexts.size });
        }
        break;
      }
      // \u603B\u7ED3\u8BF7\u6C42\uFF1A\u683C\u5F0F\u5316\u5E76\u8FD4\u56DE\u6240\u6709\u6587\u672C
      case "getSummary": {
        const sessionTextsArray = Array.from(sessionTexts);
        const formattedText = formatTextsForTranslation(sessionTextsArray);
        self.postMessage({ type: "summaryReady", payload: formattedText });
        break;
      }
      // \u83B7\u53D6\u5F53\u524D\u8BA1\u6570\u503C
      case "getCount":
        self.postMessage({ type: "countUpdated", payload: sessionTexts.size });
        break;
      // \u53EF\u9009\uFF1A\u6DFB\u52A0\u4E00\u4E2A\u6E05\u7A7A\u6307\u4EE4
      case "clear":
        sessionTexts.clear();
        self.postMessage({ type: "countUpdated", payload: 0 });
        break;
    }
  };
})();
`;
      const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
      const trustedUrl = createTrustedWorkerUrl(workerUrl);
      worker = new Worker(trustedUrl);
      worker.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === "countUpdated") {
          currentCount = payload;
          if (onUpdateCallback) onUpdateCallback(payload);
          updateScanCount(payload, "session");
        } else if (type === "summaryReady" && onSummaryCallback) {
          onSummaryCallback(payload, currentCount);
          onSummaryCallback = null;
        }
      };
      worker.onerror = (error) => {
        log(t("log.sessionScan.worker.initFailed"), "warn");
        log(t("log.sessionScan.worker.originalError", { error: error.message }), "debug");
        if (worker) worker.terminate();
        activateFallbackMode(initialTexts);
      };
      worker.postMessage({
        type: "init",
        payload: {
          filterRules: filterRules2,
          translations: {
            workerLogPrefix: t("log.sessionScan.worker.logPrefix"),
            textFiltered: t("log.textProcessor.filtered")
          }
        }
      });
      worker.postMessage({ type: "data", payload: { texts: initialTexts } });
      log(t("log.sessionScan.worker.initialized", { count: initialTexts.length }));
    } catch (e) {
      log(t("log.sessionScan.worker.initSyncError", { error: e.message }), "error");
      activateFallbackMode(initialTexts);
    }
    if (!useFallback) {
      observer = new MutationObserver(handleMutations);
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };
  var stop = (onStopped) => {
    if (!isRecording) {
      if (onStopped) onStopped(0);
      return;
    }
    log(t("log.sessionScan.domObserver.stopped"));
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    isRecording = false;
    onUpdateCallback = null;
    if (onStopped) {
      if (useFallback) {
        onStopped(getCountInFallback());
      } else if (worker) {
        const finalCountListener = (event) => {
          if (event.data.type === "countUpdated") {
            onStopped(event.data.payload);
            worker.removeEventListener("message", finalCountListener);
          }
        };
        worker.addEventListener("message", finalCountListener);
        worker.postMessage({ type: "getCount" });
      } else {
        onStopped(0);
      }
    }
  };
  var requestSummary = (onReady) => {
    if (!onReady) return;
    if (useFallback) {
      const summaryText = getSummaryInFallback();
      const summaryCount = getCountInFallback();
      onReady(summaryText, summaryCount);
    } else if (worker) {
      onSummaryCallback = onReady;
      worker.postMessage({ type: "getSummary" });
    } else {
      onReady("[]", 0);
    }
  };
  var isSessionRecording = () => isRecording;
  function createModalLayout() {
    const modalOverlay2 = document.createElement("div");
    modalOverlay2.className = "text-extractor-modal-overlay";
    modalOverlay2.tabIndex = -1;
    setModalOverlay(modalOverlay2);
    const modal = document.createElement("div");
    modal.className = "text-extractor-modal";
    const modalHeader = document.createElement("div");
    modalHeader.className = "text-extractor-modal-header";
    const modalContent = document.createElement("div");
    modalContent.className = "text-extractor-modal-content";
    const modalFooter = document.createElement("div");
    modalFooter.className = "text-extractor-modal-footer";
    modal.appendChild(modalHeader);
    modal.appendChild(modalContent);
    modal.appendChild(modalFooter);
    modalOverlay2.appendChild(modal);
    uiContainer.appendChild(modalOverlay2);
    return { modal, modalHeader, modalContent, modalFooter };
  }
  var loadingSpinner = `
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/>
    <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.75s" repeatCount="indefinite"/>
    </path>
  </svg>
`;
  var placeholder2;
  function rerenderPlaceholder() {
    if (!placeholder2) return;
    placeholder2.replaceChildren();
    const placeholderIconDiv = document.createElement("div");
    placeholderIconDiv.className = "placeholder-icon";
    const infoIconSVG = createSVGFromString(infoIcon);
    if (infoIconSVG) placeholderIconDiv.appendChild(infoIconSVG);
    const p1 = document.createElement("p");
    p1.textContent = t("results.noSummary");
    const p2 = document.createElement("p");
    p2.className = "placeholder-actions";
    p2.append(t("placeholders.click"));
    const span2 = document.createElement("span");
    span2.className = "placeholder-action-icon";
    const dynamicIconSVG = createSVGFromString(dynamicIcon);
    if (dynamicIconSVG) span2.appendChild(dynamicIconSVG);
    p2.appendChild(span2);
    const strong2 = document.createElement("strong");
    strong2.textContent = t("placeholders.dynamicScan");
    p2.appendChild(strong2);
    p2.append(t("placeholders.startNewScanSession"));
    const p3 = document.createElement("p");
    p3.className = "placeholder-actions";
    p3.append(t("placeholders.click"));
    const span3 = document.createElement("span");
    span3.className = "placeholder-action-icon";
    const translateIconSVG = createSVGFromString(translateIcon);
    if (translateIconSVG) span3.appendChild(translateIconSVG);
    p3.appendChild(span3);
    const strong3 = document.createElement("strong");
    strong3.textContent = t("placeholders.staticScan");
    p3.appendChild(strong3);
    p3.append(t("placeholders.performOneTimeScan"));
    placeholder2.appendChild(placeholderIconDiv);
    placeholder2.appendChild(p1);
    placeholder2.appendChild(p2);
    placeholder2.appendChild(p3);
  }
  function createLoadingSpinner() {
    const loadingContainer2 = document.createElement("div");
    loadingContainer2.className = "gm-loading-overlay";
    const spinner = document.createElement("div");
    spinner.className = "gm-loading-spinner";
    const spinnerSVG = createSVGFromString(loadingSpinner);
    if (spinnerSVG) spinner.appendChild(spinnerSVG);
    loadingContainer2.appendChild(spinner);
    return loadingContainer2;
  }
  function populateModalContent(modalContent) {
    if (appConfig.ui.modalContentHeight) {
      modalContent.style.height = appConfig.ui.modalContentHeight;
    }
    placeholder2 = document.createElement("div");
    placeholder2.id = "modal-placeholder";
    rerenderPlaceholder();
    setPlaceholder(placeholder2);
    const textareaContainer = document.createElement("div");
    textareaContainer.className = "tc-textarea-container";
    const lineNumbersDiv2 = document.createElement("div");
    lineNumbersDiv2.className = "tc-line-numbers";
    setLineNumbersDiv(lineNumbersDiv2);
    const outputTextarea2 = document.createElement("textarea");
    outputTextarea2.id = "text-extractor-output";
    outputTextarea2.className = "tc-textarea";
    setOutputTextarea(outputTextarea2);
    textareaContainer.appendChild(lineNumbersDiv2);
    textareaContainer.appendChild(outputTextarea2);
    const loadingContainer2 = createLoadingSpinner();
    setLoadingContainer(loadingContainer2);
    modalContent.appendChild(placeholder2);
    modalContent.appendChild(textareaContainer);
    modalContent.appendChild(loadingContainer2);
    on("languageChanged", rerenderPlaceholder);
  }
  function showLoading() {
    if (loadingContainer) loadingContainer.classList.add("is-visible");
    if (outputTextarea) outputTextarea.disabled = true;
  }
  function hideLoading() {
    if (loadingContainer) loadingContainer.classList.remove("is-visible");
    if (outputTextarea) outputTextarea.disabled = false;
  }
  var copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg>`;
  var clearIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-40v-280q0-83 58.5-141.5T320-520h40v-320q0-33 23.5-56.5T440-920h80q33 0 56.5 23.5T600-840v320h40q83 0 141.5 58.5T840-320v280H120Zm80-80h80v-120q0-17 11.5-28.5T320-280q17 0 28.5 11.5T360-240v120h80v-120q0-17 11.5-28.5T480-280q17 0 28.5 11.5T520-240v120h80v-120q0-17 11.5-28.5T640-280q17 0 28.5 11.5T680-240v120h80v-200q0-50-35-85t-85-35H320q-50 0-85 35t-35 85v200Zm320-400v-320h-80v320h80Zm0 0h-80 80Z"/></svg>`;
  var clearIcon_default = clearIcon;
  var modalContainer = null;
  var resolvePromise = null;
  function showConfirmationModal(text, iconSVG) {
    return new Promise((resolve) => {
      resolvePromise = resolve;
      if (!modalContainer) {
        modalContainer = document.createElement("div");
        modalContainer.className = "confirmation-modal-overlay";
        const modalContent = document.createElement("div");
        modalContent.className = "confirmation-modal-content";
        const iconContainer = document.createElement("div");
        iconContainer.className = "confirmation-modal-icon";
        const textContainer = document.createElement("p");
        textContainer.className = "confirmation-modal-text";
        const buttonContainer = document.createElement("div");
        buttonContainer.className = "confirmation-modal-buttons";
        const confirmButton = document.createElement("button");
        confirmButton.className = "confirmation-modal-button confirm";
        confirmButton.textContent = t("common.confirm");
        const cancelButton = document.createElement("button");
        cancelButton.className = "confirmation-modal-button cancel";
        cancelButton.textContent = t("common.cancel");
        buttonContainer.append(cancelButton, confirmButton);
        modalContent.append(iconContainer, textContainer, buttonContainer);
        modalContainer.append(modalContent);
        uiContainer.append(modalContainer);
        confirmButton.addEventListener("click", () => handleConfirmation(true));
        cancelButton.addEventListener("click", () => handleConfirmation(false));
        modalContainer.addEventListener("click", (e) => {
          if (e.target === modalContainer) {
            handleConfirmation(false);
          }
        });
      }
      modalContainer.querySelector(".confirmation-modal-icon").replaceChildren(createSVGFromString(iconSVG));
      modalContainer.querySelector(".confirmation-modal-text").textContent = text;
      setTimeout(() => {
        modalContainer.classList.add("is-visible");
      }, 50);
    });
  }
  function handleConfirmation(confirmed) {
    if (modalContainer) {
      modalContainer.classList.remove("is-visible");
      setTimeout(() => {
        modalContainer.remove();
        modalContainer = null;
        if (resolvePromise) {
          resolvePromise(confirmed);
          resolvePromise = null;
        }
      }, 300);
    }
  }
  var warningIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>`;
  var warningIcon_default = warningIcon;
  var exportIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80 280-280l56-56 104 103v-407h80v407l104-103 56 56L480-80ZM146-260q-32-49-49-105T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 59-17 115t-49 105l-58-58q22-37 33-78t11-84q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 43 11 84t33 78l-58 58Z"/></svg>`;
  var exportIcon_default = exportIcon;
  var txtIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z"/></svg>`;
  var jsonIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M190-360h70q17 0 28.5-11.5T300-400v-200h-60v190h-40v-50h-50v60q0 17 11.5 28.5T190-360Zm177 0h60q17 0 28.5-11.5T467-400v-60q0-17-11.5-28.5T427-500h-50v-50h40v20h50v-30q0-17-11.5-28.5T427-600h-60q-17 0-28.5 11.5T327-560v60q0 17 11.5 28.5T367-460h50v50h-40v-20h-50v30q0 17 11.5 28.5T367-360Zm176-60v-120h40v120h-40Zm-10 60h60q17 0 28.5-11.5T633-400v-160q0-17-11.5-28.5T593-600h-60q-17 0-28.5 11.5T493-560v160q0 17 11.5 28.5T533-360Zm127 0h50v-105l40 105h50v-240h-50v105l-40-105h-50v240ZM120-160q-33 0-56.5-23.5T40-240v-480q0-33 23.5-56.5T120-800h720q33 0 56.5 23.5T920-720v480q0 33-23.5 56.5T840-160H120Zm0-80h720v-480H120v480Zm0 0v-480 480Z"/></svg>`;
  var csvIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M230-360h120v-60H250v-120h100v-60H230q-17 0-28.5 11.5T190-560v160q0 17 11.5 28.5T230-360Zm156 0h120q17 0 28.5-11.5T546-400v-60q0-17-11.5-31.5T506-506h-60v-34h100v-60H426q-17 0-28.5 11.5T386-560v60q0 17 11.5 30.5T426-456h60v36H386v60Zm264 0h60l70-240h-60l-40 138-40-138h-60l70 240ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z"/></svg>`;
  function createDropdown(triggerElement, menuContent) {
    menuContent.classList.add("tc-dropdown-menu");
    const toggle = () => {
      const isVisible = menuContent.classList.contains("visible");
      if (isVisible) {
        menuContent.classList.add("is-hiding");
        menuContent.addEventListener("animationend", () => {
          menuContent.classList.remove("visible", "is-hiding");
        }, { once: true });
        document.removeEventListener("click", handleDocumentClick, true);
      } else {
        menuContent.classList.add("visible");
        document.addEventListener("click", handleDocumentClick, true);
      }
    };
    const handleDocumentClick = (event) => {
      const path = event.composedPath();
      const isClickInside = path.includes(triggerElement) || path.includes(menuContent);
      const isClickOnNotification = path.some(
        (element) => element.classList && element.classList.contains("tc-notification-container")
      );
      if (isClickInside || isClickOnNotification) {
        return;
      }
      toggle();
    };
    triggerElement.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
    return {
      menuElement: menuContent,
      toggle
    };
  }
  var exportBtn;
  var exportMenu;
  var exportTxtBtn;
  var exportJsonBtn;
  var exportCsvBtn;
  function rerenderExportTexts() {
    if (exportBtn) {
      exportBtn.replaceChildren();
      exportBtn.appendChild(createIconTitle(exportIcon_default, t("common.export")));
    }
    if (exportMenu) {
      exportTxtBtn.replaceChildren(createIconTitle(txtIcon, t("export.exportAsTxt")));
      exportJsonBtn.replaceChildren(createIconTitle(jsonIcon, t("export.exportAsJson")));
      exportCsvBtn.replaceChildren(createIconTitle(csvIcon, t("export.exportAsCsv")));
    }
  }
  function createExportButton() {
    const container = document.createElement("div");
    container.className = "tc-export-btn-container";
    exportBtn = document.createElement("button");
    exportBtn.className = "text-extractor-export-btn tc-button";
    exportMenu = document.createElement("div");
    exportMenu.className = "tc-export-menu";
    exportTxtBtn = document.createElement("button");
    exportTxtBtn.className = "tc-export-txt-btn";
    exportTxtBtn.dataset.format = "txt";
    exportJsonBtn = document.createElement("button");
    exportJsonBtn.className = "tc-export-json-btn";
    exportJsonBtn.dataset.format = "json";
    exportCsvBtn = document.createElement("button");
    exportCsvBtn.className = "tc-export-csv-btn";
    exportCsvBtn.dataset.format = "csv";
    exportMenu.appendChild(exportTxtBtn);
    exportMenu.appendChild(exportJsonBtn);
    exportMenu.appendChild(exportCsvBtn);
    container.appendChild(exportBtn);
    container.appendChild(exportMenu);
    rerenderExportTexts();
    const dropdown = createDropdown(exportBtn, exportMenu);
    const handleExport = (event) => {
      const target = event.target.closest("[data-format]");
      if (target) {
        const format = target.dataset.format;
        log(t("log.exporter.buttonClicked", { format }));
        fire("exportToFile", { format });
        dropdown.toggle();
      }
    };
    exportMenu.addEventListener("click", handleExport);
    on("languageChanged", rerenderExportTexts);
    exportBtn.disabled = true;
    return container;
  }
  function updateExportButtonState(hasContent) {
    if (exportBtn) {
      exportBtn.disabled = !hasContent;
    }
  }
  var clearBtn;
  var copyBtn;
  function rerenderFooterTexts() {
    if (copyBtn) {
      copyBtn.replaceChildren();
      copyBtn.appendChild(createIconTitle(copyIcon, t("common.copy")));
    }
    if (clearBtn) {
      clearBtn.replaceChildren();
      clearBtn.appendChild(createIconTitle(clearIcon_default, t("common.clear")));
    }
    updateStatistics();
  }
  function populateModalFooter(modalFooter, updateContentCallback) {
    const statsContainer2 = document.createElement("div");
    statsContainer2.className = "tc-stats-container";
    setStatsContainer(statsContainer2);
    const footerButtonContainer = document.createElement("div");
    footerButtonContainer.className = "tc-footer-buttons";
    clearBtn = document.createElement("button");
    clearBtn.className = "text-extractor-clear-btn tc-button";
    clearBtn.disabled = true;
    copyBtn = document.createElement("button");
    copyBtn.className = "text-extractor-copy-btn tc-button";
    copyBtn.disabled = true;
    const exportBtnContainer = createExportButton();
    footerButtonContainer.appendChild(exportBtnContainer);
    footerButtonContainer.appendChild(clearBtn);
    footerButtonContainer.appendChild(copyBtn);
    modalFooter.appendChild(statsContainer2);
    modalFooter.appendChild(footerButtonContainer);
    rerenderFooterTexts();
    copyBtn.addEventListener("click", () => {
      const textToCopy = outputTextarea.value;
      if (textToCopy && !copyBtn.disabled) {
        log(t("log.ui.copyButton.copied", { count: textToCopy.length }));
        setClipboard(textToCopy);
        showNotification(t("notifications.copiedToClipboard"), { type: "success" });
      } else {
        log(t("log.ui.copyButton.nothingToCopy"));
        showNotification(t("notifications.nothingToCopy"), { type: "info" });
      }
    });
    clearBtn.addEventListener("click", async () => {
      if (clearBtn.disabled) return;
      log(t("log.ui.modal.clearContent"));
      const confirmed = await showConfirmationModal(
        t("confirmation.clear"),
        warningIcon_default
      );
      if (confirmed) {
        const currentMode2 = currentMode;
        log(`Clearing content for mode: ${currentMode2}`);
        if (currentMode2 === "session-scan") {
          fire("clearSessionScan");
        } else if (currentMode2 === "element-scan") {
          fire("clearElementScan");
        }
        updateContentCallback(SHOW_PLACEHOLDER, true, currentMode2);
        showNotification(t("notifications.contentCleared"), { type: "success" });
      } else {
        log(t("log.ui.confirmationModal.cancelled"));
      }
    });
    on("languageChanged", rerenderFooterTexts);
  }
  function updateStatistics() {
    if (!statsContainer || !outputTextarea) return;
    setTimeout(() => {
      const text = outputTextarea.value;
      const lineCount = text.split("\n").length;
      const charCount = text.length;
      statsContainer.textContent = `${t("results.stats.lines")}: ${lineCount} | ${t("results.stats.chars")}: ${charCount}`;
    }, 0);
  }
  function calcStringLines(sentence, width) {
    if (!width || !canvasContext) return 1;
    const words = sentence.split("");
    let lineCount = 0;
    let currentLine = "";
    for (let i = 0; i < words.length; i++) {
      const wordWidth = canvasContext.measureText(words[i]).width;
      const lineWidth = canvasContext.measureText(currentLine).width;
      if (lineWidth + wordWidth > width) {
        lineCount++;
        currentLine = words[i];
      } else {
        currentLine += words[i];
      }
    }
    if (currentLine.trim() !== "" || sentence === "") {
      lineCount++;
    }
    return lineCount;
  }
  function calcLines() {
    const settings = loadSettings();
    const lines = outputTextarea.value.split("\n");
    let lineNumbers = [];
    let lineMap = [];
    if (settings.enableWordWrap) {
      const textareaStyles = window.getComputedStyle(outputTextarea);
      const paddingLeft = parseFloat(textareaStyles.paddingLeft);
      const paddingRight = parseFloat(textareaStyles.paddingRight);
      const textareaContentWidth = outputTextarea.clientWidth - paddingLeft - paddingRight;
      lines.forEach((lineString, realLineIndex) => {
        const numLinesOfSentence = calcStringLines(lineString, textareaContentWidth);
        lineNumbers.push(realLineIndex + 1);
        lineMap.push(realLineIndex);
        if (numLinesOfSentence > 1) {
          for (let i = 0; i < numLinesOfSentence - 1; i++) {
            lineNumbers.push("");
            lineMap.push(realLineIndex);
          }
        }
      });
    } else {
      lines.forEach((_, realLineIndex) => {
        lineNumbers.push(realLineIndex + 1);
        lineMap.push(realLineIndex);
      });
    }
    return { lineNumbers, lineMap };
  }
  function updateActiveLine() {
    if (!lineNumbersDiv || !lineNumbersDiv.classList.contains("is-visible") || !outputTextarea) return;
    const settings = loadSettings();
    const textarea = outputTextarea;
    const text = textarea.value;
    const selectionEnd = textarea.selectionEnd;
    const textBeforeCursor = text.substring(0, selectionEnd);
    const cursorRealLineIndex = textBeforeCursor.split("\n").length - 1;
    let finalVisualLineIndex = -1;
    if (settings.enableWordWrap) {
      const realLines = text.split("\n");
      let positionInRealLine = selectionEnd;
      for (let i = 0; i < cursorRealLineIndex; i++) {
        positionInRealLine -= realLines[i].length + 1;
      }
      const textareaStyles = window.getComputedStyle(textarea);
      const paddingLeft = parseFloat(textareaStyles.paddingLeft);
      const paddingRight = parseFloat(textareaStyles.paddingRight);
      const textareaContentWidth = textarea.clientWidth - paddingLeft - paddingRight;
      const lineContent = realLines[cursorRealLineIndex];
      let visualLineOffset = 0;
      let currentLine = "";
      for (let i = 0; i < lineContent.length; i++) {
        const char = lineContent[i];
        const nextLine = currentLine + char;
        if (canvasContext.measureText(nextLine).width > textareaContentWidth) {
          visualLineOffset++;
          currentLine = char;
        } else {
          currentLine = nextLine;
        }
        if (i >= positionInRealLine - 1 && positionInRealLine > 0) {
          break;
        }
      }
      const firstVisualIndexOfRealLine = currentLineMap.indexOf(cursorRealLineIndex);
      if (firstVisualIndexOfRealLine !== -1) {
        finalVisualLineIndex = firstVisualIndexOfRealLine + visualLineOffset;
      }
    } else {
      finalVisualLineIndex = cursorRealLineIndex;
    }
    const lineDivs = lineNumbersDiv.children;
    for (let i = 0; i < lineDivs.length; i++) {
      lineDivs[i].classList.remove("is-active");
    }
    if (finalVisualLineIndex !== -1 && lineDivs[finalVisualLineIndex]) {
      lineDivs[finalVisualLineIndex].classList.add("is-active");
    }
  }
  var isThrottled = false;
  function updateLineNumbers() {
    if (!lineNumbersDiv || !outputTextarea || isThrottled) return;
    isThrottled = true;
    setTimeout(() => {
      const { lineNumbers, lineMap } = calcLines();
      setCurrentLineMap(lineMap);
      const currentLineCount = lineNumbersDiv.children.length;
      const newLineCount = lineNumbers.length;
      for (let i = 0; i < newLineCount; i++) {
        const lineText = lineNumbers[i] === "" ? "\xA0" : lineNumbers[i];
        if (i < currentLineCount) {
          if (lineNumbersDiv.children[i].textContent !== lineText) {
            lineNumbersDiv.children[i].textContent = lineText;
          }
        } else {
          const div = document.createElement("div");
          div.textContent = lineText;
          div.classList.add("line-number-enter-active");
          lineNumbersDiv.appendChild(div);
          div.addEventListener("animationend", () => {
            div.classList.remove("line-number-enter-active");
          }, { once: true });
        }
      }
      if (newLineCount < currentLineCount) {
        for (let i = currentLineCount - 1; i >= newLineCount; i--) {
          lineNumbersDiv.removeChild(lineNumbersDiv.children[i]);
        }
      }
      updateActiveLine();
      isThrottled = false;
    }, 100);
  }
  function initializeLineNumbers() {
    const canvas = document.createElement("canvas");
    const canvasContext2 = canvas.getContext("2d");
    const textareaStyles = window.getComputedStyle(outputTextarea);
    canvasContext2.font = `${textareaStyles.fontSize} ${textareaStyles.fontFamily}`;
    setCanvasContext(canvasContext2);
    const resizeObserver = new ResizeObserver(() => {
      if (!lineNumbersDiv || !outputTextarea) return;
      lineNumbersDiv.style.height = outputTextarea.clientHeight + "px";
      updateLineNumbers();
    });
    resizeObserver.observe(outputTextarea);
  }
  var fullQuickScanContent = "";
  var handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      closeModal();
    }
  };
  function createMainModal() {
    if (modalOverlay) return;
    const { modalHeader, modalContent, modalFooter } = createModalLayout();
    populateModalHeader(modalHeader, closeModal);
    populateModalContent(modalContent);
    populateModalFooter(modalFooter, updateModalContent);
    initializeLineNumbers();
    const handleTextareaUpdate = () => {
      updateLineNumbers();
      updateStatistics();
    };
    outputTextarea.addEventListener("input", handleTextareaUpdate);
    outputTextarea.addEventListener("click", updateActiveLine);
    outputTextarea.addEventListener("keyup", updateActiveLine);
    outputTextarea.addEventListener("scroll", () => {
      lineNumbersDiv.scrollTop = outputTextarea.scrollTop;
    });
    updateModalAddonsVisibility();
  }
  async function openModal() {
    if (!modalOverlay) {
      console.error(t("notifications.modalInitError"));
      return;
    }
    log(t("log.ui.modal.opening"));
    updateModalContent(SHOW_LOADING, true, "quick-scan");
    try {
      const extractedTexts = extractAndProcessText();
      const { formattedText, count } = await performQuickScan(extractedTexts);
      hideLoading();
      fullQuickScanContent = formattedText;
      updateModalContent(formattedText, false, "quick-scan");
      const notificationText = simpleTemplate(t("scan.quickFinished"), { count });
      showNotification(notificationText, { type: "success" });
    } catch (error) {
      hideLoading();
      log(t("log.ui.modal.scanFailed", { error: error.message }));
      showNotification(t("scan.quickFailed"), { type: "error" });
      updateModalContent("[]", false, "quick-scan");
    }
  }
  function closeModal() {
    if (modalOverlay && modalOverlay.classList.contains("is-visible")) {
      log(t("log.ui.modal.closing"));
      modalOverlay.classList.remove("is-visible");
      modalOverlay.removeEventListener("keydown", handleKeyDown);
      fire("modalClosed");
    }
  }
  function updateModalContent(content, shouldOpen = false, mode = "quick-scan") {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    setCurrentMode(mode);
    const copyBtn2 = modalOverlay.querySelector(".text-extractor-copy-btn");
    const clearBtn2 = modalOverlay.querySelector(".text-extractor-clear-btn");
    const textareaContainer = outputTextarea.parentElement;
    const setButtonsDisabled = (disabled) => {
      if (copyBtn2) copyBtn2.disabled = disabled;
      if (clearBtn2) {
        clearBtn2.disabled = isSessionRecording() || disabled;
      }
      updateExportButtonState(!disabled);
    };
    if (content === SHOW_LOADING) {
      placeholder.classList.remove("is-visible");
      textareaContainer.classList.add("is-visible");
      outputTextarea.value = "";
      showLoading();
      setButtonsDisabled(true);
    } else if (content === SHOW_PLACEHOLDER) {
      hideLoading();
      textareaContainer.classList.remove("is-visible");
      placeholder.classList.add("is-visible");
      setButtonsDisabled(true);
    } else {
      hideLoading();
      placeholder.classList.remove("is-visible");
      textareaContainer.classList.add("is-visible");
      const settings = loadSettings();
      let displayText = content;
      if (settings.enableTextTruncation && content.length > settings.textTruncationLength) {
        displayText = content.substring(0, settings.textTruncationLength);
        const warningMessage = t("scan.truncationWarning");
        displayText += `
--- ${warningMessage} ---`;
      }
      const isData = content && content.trim().length > 0;
      if (!isData || content === t("results.noSummary")) {
        updateScanCount(0, mode);
      }
      setTimeout(() => {
        outputTextarea.value = displayText;
        setButtonsDisabled(!isData);
        outputTextarea.readOnly = !isData;
        outputTextarea.dispatchEvent(new Event("input"));
        setTimeout(updateActiveLine, 0);
      }, 0);
    }
    updateModalAddonsVisibility();
    if (shouldOpen) {
      modalOverlay.classList.add("is-visible");
      modalOverlay.addEventListener("keydown", handleKeyDown);
      modalOverlay.addEventListener("transitionend", () => {
        modalOverlay.focus();
      }, { once: true });
    }
  }
  function updateModalAddonsVisibility() {
    if (!modalOverlay) return;
    const settings = loadSettings();
    if (lineNumbersDiv) {
      lineNumbersDiv.classList.toggle("is-visible", settings.showLineNumbers);
    }
    if (statsContainer) {
      const hasContent = outputTextarea && outputTextarea.parentElement.classList.contains("is-visible");
      statsContainer.classList.toggle("is-visible", settings.showStatistics && hasContent);
    }
    if (outputTextarea) {
      outputTextarea.classList.toggle("word-wrap-disabled", !settings.enableWordWrap);
    }
  }
  var defaultSettings = {
    language: "auto",
    theme: "system",
    showFab: true,
    fabPosition: "bottom-right",
    showScanCount: true,
    showLineNumbers: true,
    showStatistics: true,
    enableWordWrap: false,
    enableTextTruncation: true,
    textTruncationLength: 5e4,
    enableDebugLogging: false,
    filterRules: {
      numbers: true,
      chinese: true,
      containsChinese: false,
      emojiOnly: true,
      symbols: true,
      termFilter: true,
      singleLetter: false,
      repeatingChars: true,
      filePath: true,
      hexColor: true,
      email: true,
      uuid: true,
      gitCommitHash: true,
      websiteUrl: true,
      shorthandNumber: true
    }
  };
  function applySettings(newSettings, oldSettings) {
    updateLoggerState(newSettings.enableDebugLogging);
    applyTheme(newSettings.theme);
    const languageChanged = oldSettings.language !== newSettings.language;
    if (languageChanged) {
      switchLanguage(newSettings.language);
    }
    const fabContainer = uiContainer.querySelector(".text-extractor-fab-container");
    if (fabContainer) {
      fabContainer.classList.toggle("fab-container-visible", newSettings.showFab);
    }
    updateModalAddonsVisibility();
    fire("settingsSaved");
    showNotification(t("notifications.settingsSaved"), { type: "success" });
  }
  function loadSettings() {
    const savedSettings = getValue("script_settings", null);
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const mergedSettings = {
          ...defaultSettings,
          ...parsedSettings,
          filterRules: {
            ...defaultSettings.filterRules,
            ...parsedSettings.filterRules || {}
          }
        };
        return mergedSettings;
      } catch (error) {
        log(t("log.settings.parseError"), error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  }
  function saveSettings(newSettings) {
    if (typeof newSettings !== "object" || newSettings === null) {
      log(t("log.settings.invalidObject"), newSettings);
      return;
    }
    const oldSettings = loadSettings();
    Object.keys(newSettings).forEach((key) => {
      if (key !== "filterRules" && oldSettings[key] !== newSettings[key]) {
        log(t("log.settings.changed", {
          key,
          oldValue: oldSettings[key],
          newValue: newSettings[key]
        }));
      }
    });
    const oldRules = oldSettings.filterRules || {};
    const newRules = newSettings.filterRules || {};
    const allRuleKeys =  new Set([...Object.keys(oldRules), ...Object.keys(newRules)]);
    allRuleKeys.forEach((key) => {
      const oldValue = !!oldRules[key];
      const newValue = !!newRules[key];
      if (oldValue !== newValue) {
        const statusKey = newValue ? "log.settings.filterRuleChanged.enabled" : "log.settings.filterRuleChanged.disabled";
        log(t(statusKey, { key }));
      }
    });
    setValue("script_settings", JSON.stringify(newSettings));
  }
  var summaryFab;
  var dynamicFab;
  var staticFab;
  var elementScanFab;
  function createSingleFab(className, iconSVGString, titleKey, onClick) {
    const fab = document.createElement("div");
    fab.className = `text-extractor-fab ${className}`;
    const svgIcon = createSVGFromString(iconSVGString);
    if (svgIcon) {
      fab.appendChild(svgIcon);
    }
    fab.dataset.tooltipKey = titleKey;
    fab.addEventListener("click", (event) => {
      if (fab.classList.contains("fab-disabled")) {
        event.stopPropagation();
        return;
      }
      onClick(event);
    });
    fab.addEventListener("mouseenter", () => {
      showTooltip(fab, t(fab.dataset.tooltipKey));
    });
    fab.addEventListener("mouseleave", () => {
      hideTooltip();
    });
    return fab;
  }
  function updateFabTooltips() {
    if (summaryFab) {
      summaryFab.addEventListener("mouseenter", () => showTooltip(summaryFab, t(summaryFab.dataset.tooltipKey)));
    }
    if (dynamicFab) {
      dynamicFab.addEventListener("mouseenter", () => showTooltip(dynamicFab, t(dynamicFab.dataset.tooltipKey)));
    }
    if (staticFab) {
      staticFab.addEventListener("mouseenter", () => showTooltip(staticFab, t(staticFab.dataset.tooltipKey)));
    }
    if (elementScanFab) {
      elementScanFab.addEventListener("mouseenter", () => showTooltip(elementScanFab, t(elementScanFab.dataset.tooltipKey)));
    }
  }
  function createFab({ callbacks, isVisible }) {
    const { onStaticExtract, onDynamicExtract, onSummary, onElementScan } = callbacks;
    const fabContainer = document.createElement("div");
    fabContainer.className = "text-extractor-fab-container";
    summaryFab = createSingleFab(
      "fab-summary",
      summaryIcon,
      "tooltip.summary",
      onSummary
    );
    dynamicFab = createSingleFab(
      "fab-dynamic",
      dynamicIcon,
      "tooltip.dynamic_scan",
      () => onDynamicExtract(dynamicFab)
    );
    staticFab = createSingleFab(
      "fab-static",
      translateIcon,
      "tooltip.static_scan",
      onStaticExtract
    );
    elementScanFab = createSingleFab(
      "fab-element-scan",
      elementScanIcon,
      "tooltip.element_scan",
      () => onElementScan(elementScanFab)
    );
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    fabContainer.appendChild(elementScanFab);
    uiContainer.appendChild(fabContainer);
    if (isVisible) {
      setTimeout(() => {
        fabContainer.classList.add("fab-container-visible");
      }, appConfig.ui.fabAnimationDelay);
    }
    updateFabPosition(fabContainer);
    on("languageChanged", updateFabTooltips);
    on("settingsSaved", () => updateFabPosition(fabContainer));
  }
  function updateFabPosition(fabContainer) {
    if (!fabContainer) return;
    const settings = loadSettings();
    const position = settings.fabPosition || "bottom-right";
    fabContainer.classList.remove("fab-position-bottom-right", "fab-position-top-right", "fab-position-bottom-left", "fab-position-top-left");
    fabContainer.classList.add(`fab-position-${position}`);
  }
  function setFabIcon(fabElement, iconSVGString) {
    while (fabElement.firstChild) {
      fabElement.removeChild(fabElement.firstChild);
    }
    const newIcon = createSVGFromString(iconSVGString);
    if (newIcon) {
      fabElement.appendChild(newIcon);
    }
  }
  function getDynamicFab() {
    return dynamicFab;
  }
  function getElementScanFab() {
    return elementScanFab;
  }
  function updateFabTooltip(fabElement, newTooltipKey) {
    if (fabElement) {
      fabElement.dataset.tooltipKey = newTooltipKey;
    }
  }
  function handleQuickScanClick() {
    log(t("scan.quick"));
    openModal();
  }
  function animateCount(element, start2, end, duration, easing) {
    const startTime = performance.now();
    function frame(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easing(progress);
      const currentCount3 = Math.round(start2 + (end - start2) * easedProgress);
      element.textContent = currentCount3;
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }
  var easeOutQuad = (t2) => t2 * (2 - t2);
  var currentCount2 = 0;
  function createTopCenterCounter(labelKey) {
    const counterElement3 = document.createElement("div");
    counterElement3.className = "tc-top-center-counter";
    const textNode = document.createTextNode(t(labelKey));
    const countSpan = document.createElement("span");
    countSpan.textContent = "0";
    counterElement3.appendChild(textNode);
    counterElement3.appendChild(countSpan);
    counterElement3._countSpan = countSpan;
    const languageChangeHandler = () => {
      textNode.textContent = t(labelKey);
    };
    const unsubscribe = on("languageChanged", languageChangeHandler);
    counterElement3.destroy = () => {
      unsubscribe();
    };
    return counterElement3;
  }
  function updateTopCenterCounter(element, newCount) {
    if (!element || !element._countSpan) return;
    const countSpan = element._countSpan;
    const start2 = currentCount2;
    const end = newCount;
    currentCount2 = newCount;
    if (start2 === end) {
      countSpan.textContent = String(end);
      return;
    }
    const duration = 500 + Math.min(Math.abs(end - start2) * 10, 1e3);
    animateCount(countSpan, start2, end, duration, easeOutQuad);
  }
  var stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-280v-400h400v400H280Z"/></svg>`;
  var currentSessionCount = 0;
  var counterElement = null;
  on("sessionCleared", () => {
    currentSessionCount = 0;
  });
  function showSessionSummary() {
    log(t("tooltip.summary"));
    if (isSessionRecording()) {
      showNotification(t("scan.sessionInProgress"), { type: "info" });
    }
    updateScanCount(currentSessionCount, "session");
    updateModalContent(SHOW_LOADING, true, "session-scan");
    setTimeout(() => {
      requestSummary((formattedText, count) => {
        updateScanCount(count, "session");
        if (!formattedText || formattedText.trim() === "[]") {
          updateModalContent(SHOW_PLACEHOLDER, true, "session-scan");
        } else {
          updateModalContent(formattedText, true, "session-scan");
        }
      });
    }, 50);
  }
  function handleDynamicExtractClick(dynamicFab2) {
    const elementScanFab2 = getElementScanFab();
    if (isSessionRecording()) {
      log(t("scan.stopSession"));
      stop((finalCount) => {
        const notificationText = simpleTemplate(t("scan.finished"), { count: finalCount });
        showNotification(notificationText, { type: "success" });
        currentSessionCount = finalCount;
      });
      setFabIcon(dynamicFab2, dynamicIcon);
      dynamicFab2.classList.remove("is-recording");
      updateFabTooltip(dynamicFab2, "tooltip.dynamic_scan");
      if (counterElement) {
        const counterToRemove = counterElement;
        counterToRemove.classList.remove("is-visible");
        setTimeout(() => {
          if (typeof counterToRemove.destroy === "function") {
            counterToRemove.destroy();
          }
          counterToRemove.remove();
        }, 400);
        counterElement = null;
      }
      if (elementScanFab2) {
        elementScanFab2.classList.remove("fab-disabled");
        if (elementScanFab2.dataset.originalTooltipKey) {
          updateFabTooltip(elementScanFab2, elementScanFab2.dataset.originalTooltipKey);
        }
      }
    } else {
      log(t("scan.startSession"));
      setFabIcon(dynamicFab2, stopIcon);
      dynamicFab2.classList.add("is-recording");
      updateFabTooltip(dynamicFab2, "scan.stopSession");
      if (elementScanFab2) {
        elementScanFab2.dataset.originalTooltipKey = elementScanFab2.dataset.tooltipKey;
        updateFabTooltip(elementScanFab2, "tooltip.disabled.scan_in_progress");
        elementScanFab2.classList.add("fab-disabled");
      }
      showNotification(t("scan.sessionStarted"), { type: "info" });
      counterElement = createTopCenterCounter("common.discovered");
      uiContainer.appendChild(counterElement);
      requestAnimationFrame(() => {
        counterElement.classList.add("is-visible");
      });
      setTimeout(() => {
        start((count) => {
          updateTopCenterCounter(counterElement, count);
          currentSessionCount = count;
        });
      }, 50);
    }
  }
  var questionMarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  var Tooltip = class {
    constructor() {
      this.tooltipElement = null;
      this.handleEscKey = this.handleEscKey.bind(this);
    }
        _createDOM(config) {
      const overlay = document.createElement("div");
      overlay.className = "info-tooltip-overlay";
      overlay.tabIndex = -1;
      const tooltip = document.createElement("div");
      tooltip.className = "info-tooltip-modal";
      if (config.width) tooltip.style.width = config.width;
      if (config.height) tooltip.style.height = config.height;
      const header = document.createElement("div");
      header.className = "info-tooltip-header";
      const titleContainer2 = document.createElement("div");
      titleContainer2.className = "info-tooltip-title-container";
      if (config.titleIcon) {
        const iconElement = createSVGFromString(config.titleIcon);
        iconElement.classList.add("info-tooltip-title-icon");
        titleContainer2.appendChild(iconElement);
      }
      const titleElement = document.createElement("h3");
      titleElement.className = "info-tooltip-title";
      titleElement.textContent = config.title;
      titleContainer2.appendChild(titleElement);
      const closeButton = document.createElement("span");
      closeButton.className = "info-tooltip-close";
      closeButton.appendChild(createSVGFromString(closeIcon));
      closeButton.addEventListener("click", () => this.hide());
      header.appendChild(titleContainer2);
      header.appendChild(closeButton);
      const content = document.createElement("div");
      content.className = "info-tooltip-content";
      const textElement = document.createElement("p");
      textElement.innerHTML = createTrustedHTML(config.text || "");
      content.appendChild(textElement);
      tooltip.appendChild(header);
      tooltip.appendChild(content);
      overlay.appendChild(tooltip);
      this.tooltipElement = overlay;
      uiContainer.appendChild(this.tooltipElement);
    }
    /**
     * @public
     * @description 显示并填充提示窗口。
     * @param {object} config - 提示窗口的配置对象。
     */
    show(config) {
      if (!this.tooltipElement) {
        this._createDOM(config);
      }
      fire("infoTooltipWillShow");
      setTimeout(() => {
        if (this.tooltipElement) {
          const onTransitionEnd = () => {
            this.tooltipElement.focus();
            this.tooltipElement.addEventListener("keydown", this.handleEscKey);
            this.tooltipElement.removeEventListener("transitionend", onTransitionEnd);
          };
          this.tooltipElement.addEventListener("transitionend", onTransitionEnd);
          this.tooltipElement.classList.add("is-visible");
        }
      }, 10);
    }
        hide() {
      if (this.tooltipElement && this.tooltipElement.classList.contains("is-visible")) {
        this.tooltipElement.classList.remove("is-visible");
        this.tooltipElement.removeEventListener("keydown", this.handleEscKey);
        const onTransitionEnd = () => {
          if (this.tooltipElement && this.tooltipElement.parentNode) {
            this.tooltipElement.removeEventListener("transitionend", onTransitionEnd);
            this.tooltipElement.parentNode.removeChild(this.tooltipElement);
            this.tooltipElement = null;
            fire("infoTooltipDidHide");
          }
        };
        this.tooltipElement.addEventListener("transitionend", onTransitionEnd);
      }
    }
        handleEscKey(event) {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        this.hide();
      }
    }
  };
  var infoTooltip = new Tooltip();
  function createHelpIcon(contentKey) {
    const helpButton = document.createElement("button");
    helpButton.className = "tc-help-icon-button";
    helpButton.innerHTML = createTrustedHTML(questionMarkIcon);
    helpButton.addEventListener("click", (event) => {
      event.stopPropagation();
      log(`\u70B9\u51FB\u4E86\u5E2E\u52A9\u56FE\u6807\uFF0C\u663E\u793A\u5185\u5BB9\u952E: ${contentKey}`);
      const helpContent = t(contentKey);
      const helpTitle = t(`${contentKey}Title`);
      infoTooltip.show({
        title: helpTitle,
        text: helpContent,
        titleIcon: questionMarkIcon
      });
    });
    return helpButton;
  }
  var topCenterContainer = null;
  var counterElement2 = null;
  var helpIcon = null;
  var scanContainer = null;
  var highlightBorder = null;
  var tagNameTooltip = null;
  var toolbar = null;
  function getElementSelector(element) {
    if (!element) return "";
    const currentTag = element.tagName.toLowerCase();
    const parent = element.parentElement;
    if (!parent || parent.tagName.toLowerCase() === "body") {
      return currentTag;
    }
    const parentTag = parent.tagName.toLowerCase();
    return `${parentTag} ${currentTag}`;
  }
  function createHighlightElements() {
    if (!scanContainer) {
      log(t("log.elementScanUI.creatingHighlights"));
      scanContainer = document.createElement("div");
      scanContainer.id = "element-scan-container";
      scanContainer.style.position = "absolute";
      scanContainer.style.top = "0";
      scanContainer.style.left = "0";
      scanContainer.style.willChange = "transform";
      highlightBorder = document.createElement("div");
      highlightBorder.id = "element-scan-highlight-border";
      scanContainer.appendChild(highlightBorder);
      tagNameTooltip = document.createElement("div");
      tagNameTooltip.id = "element-scan-tag-name";
      scanContainer.appendChild(tagNameTooltip);
      uiContainer.appendChild(scanContainer);
    }
    requestAnimationFrame(() => {
      scanContainer.classList.add("is-visible");
    });
  }
  function updateHighlight(targetElement) {
    if (!targetElement) return;
    createHighlightElements();
    const rect = targetElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const padding = 6;
    const elementSelector = getElementSelector(targetElement);
    const coordinates = {
      top: rect.top.toFixed(2),
      left: rect.left.toFixed(2),
      width: rect.width.toFixed(2),
      height: rect.height.toFixed(2)
    };
    log(simpleTemplate(t("log.elementScanUI.updatingHighlight"), { tagName: elementSelector }), coordinates);
    const newWidth = rect.width + padding * 2;
    const newHeight = rect.height + padding * 2;
    const newX = rect.left + scrollX - padding;
    const newY = rect.top + scrollY - padding;
    scanContainer.style.width = `${newWidth}px`;
    scanContainer.style.height = `${newHeight}px`;
    scanContainer.style.transform = `translate(${newX}px, ${newY}px)`;
    tagNameTooltip.textContent = elementSelector;
    const toolbarTag = uiContainer.querySelector("#element-scan-toolbar-tag");
    if (toolbarTag) {
      toolbarTag.textContent = getElementSelector(targetElement);
    }
  }
  function createAdjustmentToolbar(elementPath2) {
    if (toolbar) cleanupToolbar();
    log(t("log.elementScanUI.creatingToolbar"));
    toolbar = document.createElement("div");
    toolbar.id = "element-scan-toolbar";
    toolbar.innerHTML = createTrustedHTML(`
        <div id="element-scan-toolbar-tag" title="${t("tooltip.dragHint")}">${getElementSelector(elementPath2[0])}</div>
        <input type="range" id="element-scan-level-slider" min="0" max="${elementPath2.length - 1}" value="0" />
        <div id="element-scan-toolbar-actions">
            <button id="element-scan-toolbar-reselect">${t("common.reselect")}</button>
            <button id="element-scan-toolbar-stage">${t("common.stage")}</button>
            <button id="element-scan-toolbar-cancel">${t("common.cancel")}</button>
            <button id="element-scan-toolbar-confirm">${t("common.confirm")}</button>
        </div>
    `);
    uiContainer.appendChild(toolbar);
    const initialRect = elementPath2[0].getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const margin = 10;
    let top, left;
    const alignRight = () => {
      let l = initialRect.right - toolbarRect.width;
      if (l < margin) l = margin;
      if (l + toolbarRect.width > viewportWidth - margin) {
        l = viewportWidth - toolbarRect.width - margin;
      }
      return l;
    };
    const topAbove = initialRect.top - toolbarRect.height - margin;
    const topBelow = initialRect.bottom + margin;
    const canPlaceAbove = topAbove > margin;
    const canPlaceBelow = topBelow + toolbarRect.height < viewportHeight - margin;
    if (canPlaceAbove) {
      top = topAbove;
      left = alignRight();
    } else if (canPlaceBelow) {
      top = topBelow;
      left = alignRight();
    } else {
      top = (viewportHeight - toolbarRect.height) / 2;
      left = (viewportWidth - toolbarRect.width) / 2;
    }
    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;
    log(t("log.elementScanUI.toolbarPositioned"));
    addToolbarEventListeners();
    makeDraggable(toolbar);
    requestAnimationFrame(() => {
      toolbar.classList.add("is-visible");
    });
  }
  function addToolbarEventListeners() {
    const slider = uiContainer.querySelector("#element-scan-level-slider");
    const reselectBtn = uiContainer.querySelector("#element-scan-toolbar-reselect");
    const stageBtn = uiContainer.querySelector("#element-scan-toolbar-stage");
    const cancelBtn = uiContainer.querySelector("#element-scan-toolbar-cancel");
    const confirmBtn = uiContainer.querySelector("#element-scan-toolbar-confirm");
    slider.addEventListener("input", () => {
      log(simpleTemplate(t("log.elementScanUI.sliderChanged"), { level: slider.value }));
      updateSelectionLevel(slider.value);
    });
    reselectBtn.addEventListener("click", () => {
      log(t("log.elementScanUI.reselectClicked"));
      reselectElement();
    });
    stageBtn.addEventListener("click", () => {
      log(t("log.elementScanUI.stageClicked"));
      stageCurrentElement();
    });
    cancelBtn.addEventListener("click", () => {
      log(t("log.elementScanUI.cancelClicked"));
      const fabElement = uiContainer.querySelector(".fab-element-scan");
      stopElementScan(fabElement);
    });
    confirmBtn.addEventListener("click", () => {
      log(t("log.elementScanUI.confirmClicked"));
      confirmSelectionAndExtract();
    });
  }
  function makeDraggable(element) {
    let offsetX, offsetY;
    const onMouseDown = (e) => {
      if (e.target.id !== "element-scan-toolbar" && e.target.id !== "element-scan-toolbar-tag") return;
      e.preventDefault();
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      log(t("log.elementScanUI.dragStarted"));
    };
    const onMouseMove = (e) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const rect = element.getBoundingClientRect();
      let newLeft = e.clientX - offsetX;
      let newTop = e.clientY - offsetY;
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + rect.width > viewportWidth) newLeft = viewportWidth - rect.width;
      if (newTop + rect.height > viewportHeight) newTop = viewportHeight - rect.height;
      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      log(t("log.elementScanUI.dragEnded"));
    };
    element.addEventListener("mousedown", onMouseDown);
  }
  function cleanupUI() {
    if (scanContainer) {
      log(t("log.elementScanUI.cleaningHighlights"));
      scanContainer.classList.remove("is-visible");
    }
  }
  function cleanupToolbar() {
    if (toolbar) {
      log(t("log.elementScanUI.cleaningToolbar"));
      const toolbarToRemove = toolbar;
      toolbar = null;
      toolbarToRemove.classList.remove("is-visible");
      setTimeout(() => {
        toolbarToRemove.remove();
      }, 300);
    }
  }
  function setupTopCenterUI() {
    topCenterContainer = document.createElement("div");
    topCenterContainer.className = "top-center-ui-container";
    counterElement2 = createTopCenterCounter("scan.stagedCount");
    helpIcon = createHelpIcon("tutorial.elementScan");
    helpIcon.classList.add("element-scan-help-icon");
    topCenterContainer.appendChild(counterElement2);
    topCenterContainer.appendChild(helpIcon);
    uiContainer.appendChild(topCenterContainer);
  }
  function showTopCenterUI() {
    if (topCenterContainer) return;
    setupTopCenterUI();
    requestAnimationFrame(() => {
      topCenterContainer.classList.add("is-visible");
    });
  }
  function hideTopCenterUI() {
    if (!topCenterContainer) return;
    const containerToRemove = topCenterContainer;
    containerToRemove.classList.remove("is-visible");
    setTimeout(() => {
      if (counterElement2 && typeof counterElement2.destroy === "function") {
        counterElement2.destroy();
      }
      containerToRemove.remove();
    }, 400);
    topCenterContainer = null;
    counterElement2 = null;
    helpIcon = null;
  }
  var performScanInMainThread2 = (texts, filterRules2, enableDebugLogging) => {
    const uniqueTexts =  new Set();
    const mainThreadLog = (message, ...args) => {
      if (enableDebugLogging) {
        log(message, ...args);
      }
    };
    if (Array.isArray(texts)) {
      texts.forEach((rawText) => {
        if (!rawText || typeof rawText !== "string") return;
        const normalizedText = rawText.normalize("NFC");
        const textForFiltering = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n").trim();
        if (textForFiltering === "") return;
        const filterResult = shouldFilter(textForFiltering, filterRules2);
        if (filterResult) {
          mainThreadLog(t("log.textProcessor.filtered", { text: textForFiltering, reason: filterResult }));
          return;
        }
        uniqueTexts.add(normalizedText.replace(/(\r\n|\n|\r)+/g, "\n"));
      });
    }
    const textsArray = Array.from(uniqueTexts);
    const formattedText = formatTextsForTranslation(textsArray);
    return {
      formattedText,
      count: textsArray.length
    };
  };
  var isActive = false;
  var isAdjusting = false;
  var currentTarget = null;
  var elementPath = [];
  var stagedTexts =  new Set();
  var shouldResumeAfterModalClose = false;
  var scrollableParents = [];
  var scrollUpdateQueued = false;
  on("clearElementScan", () => {
    stagedTexts.clear();
    updateStagedCount();
  });
  function handleScroll() {
    if (!scrollUpdateQueued) {
      scrollUpdateQueued = true;
      requestAnimationFrame(() => {
        if (currentTarget && isAdjusting) {
          updateHighlight(currentTarget);
        }
        scrollUpdateQueued = false;
      });
    }
  }
  function addScrollListeners() {
    let parent = currentTarget.parentElement;
    while (parent) {
      if (parent.scrollHeight > parent.clientHeight || parent.scrollWidth > parent.clientWidth) {
        scrollableParents.push(parent);
        parent.addEventListener("scroll", handleScroll, { passive: true });
      }
      parent = parent.parentElement;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    log(simpleTemplate(t("log.elementScan.scrollListenersAdded"), { count: scrollableParents.length }));
  }
  function removeScrollListeners() {
    scrollableParents.forEach((parent) => {
      parent.removeEventListener("scroll", handleScroll);
    });
    window.removeEventListener("scroll", handleScroll);
    scrollableParents = [];
    log(t("log.elementScan.scrollListenersRemoved"));
  }
  function isElementScanActive() {
    return isActive;
  }
  function getStagedTexts() {
    return stagedTexts;
  }
  function getShouldResumeAfterModalClose() {
    return shouldResumeAfterModalClose;
  }
  function setShouldResumeAfterModalClose(value) {
    shouldResumeAfterModalClose = value;
  }
  function handleElementScanClick(fabElement) {
    if (isActive) {
      stopElementScan(fabElement);
    } else {
      startElementScan(fabElement);
    }
  }
  function startElementScan(fabElement) {
    log(t("log.elementScan.starting"));
    showNotification(t("notifications.elementScanStarted"), { type: "info" });
    isActive = true;
    isAdjusting = false;
    fabElement.classList.add("is-recording");
    updateFabTooltip(fabElement, "scan.stopSession");
    showTopCenterUI();
    const dynamicFab2 = getDynamicFab();
    if (dynamicFab2) {
      dynamicFab2.dataset.originalTooltipKey = dynamicFab2.dataset.tooltipKey;
      updateFabTooltip(dynamicFab2, "tooltip.disabled.scan_in_progress");
      dynamicFab2.classList.add("fab-disabled");
    }
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleElementClick, true);
    document.addEventListener("keydown", handleElementScanKeyDown);
    document.addEventListener("contextmenu", handleContextMenu, true);
    log(t("log.elementScan.listenersAdded"));
  }
  function stopElementScan(fabElement) {
    if (!isActive) return;
    log(t("log.elementScan.stopping"));
    isActive = false;
    isAdjusting = false;
    if (fabElement) {
      fabElement.classList.remove("is-recording");
      updateFabTooltip(fabElement, "tooltip.element_scan");
    }
    const dynamicFab2 = getDynamicFab();
    if (dynamicFab2) {
      dynamicFab2.classList.remove("fab-disabled");
      if (dynamicFab2.dataset.originalTooltipKey) {
        updateFabTooltip(dynamicFab2, dynamicFab2.dataset.originalTooltipKey);
      }
    }
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    document.removeEventListener("click", handleElementClick, true);
    document.removeEventListener("keydown", handleElementScanKeyDown);
    document.removeEventListener("contextmenu", handleContextMenu, true);
    log(t("log.elementScan.listenersRemoved"));
    cleanupUI();
    cleanupToolbar();
    hideTopCenterUI();
    removeScrollListeners();
    elementPath = [];
    currentTarget = null;
    stagedTexts.clear();
    updateStagedCount();
    log(t("log.elementScan.stateReset"));
  }
  function reselectElement() {
    log(t("log.elementScan.reselecting"));
    isAdjusting = false;
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("click", handleElementClick, true);
  }
  function stageCurrentElement() {
    if (currentTarget) {
      const newTexts = extractAndProcessTextFromElement(currentTarget);
      newTexts.forEach((text) => stagedTexts.add(text));
      log(simpleTemplate(t("log.elementScan.staged"), { count: stagedTexts.size }));
      updateStagedCount();
    }
    reselectElement();
  }
  function updateStagedCount() {
    updateTopCenterCounter(stagedTexts.size);
  }
  function handleMouseOver(event) {
    if (!isActive || isAdjusting) return;
    if (event.target.closest(".text-extractor-fab-container") || event.target.closest("#text-extractor-container")) {
      cleanupUI();
      currentTarget = null;
      return;
    }
    currentTarget = event.target;
    log(simpleTemplate(t("log.elementScan.hovering"), { tagName: currentTarget.tagName }));
    updateHighlight(currentTarget);
  }
  function handleMouseOut(event) {
    if (event.target === currentTarget) {
      cleanupUI();
    }
  }
  function handleElementScanKeyDown(event) {
    if (isActive && event.key === "Escape") {
      log(t("log.elementScan.escapePressed"));
      const fabElement = uiContainer.querySelector(".fab-element-scan");
      stopElementScan(fabElement);
    }
  }
  function handleContextMenu(event) {
    if (isActive && !isAdjusting) {
      event.preventDefault();
      log(t("log.elementScan.rightClickExit"));
      const fabElement = uiContainer.querySelector(".fab-element-scan");
      stopElementScan(fabElement);
    }
  }
  function handleElementClick(event) {
    if (!isActive || isAdjusting || !currentTarget) return;
    event.preventDefault();
    event.stopPropagation();
    const tagName = currentTarget.tagName.toLowerCase();
    log(simpleTemplate(t("log.elementScan.clickedEnteringAdjust"), { tagName }));
    isAdjusting = true;
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    elementPath = [];
    let el = currentTarget;
    while (el && el.tagName !== "BODY") {
      elementPath.push(el);
      el = el.parentElement;
    }
    elementPath.push(document.body);
    log(simpleTemplate(t("log.elementScan.pathBuilt"), { depth: elementPath.length }));
    createAdjustmentToolbar(elementPath);
    addScrollListeners();
  }
  function updateSelectionLevel(level) {
    const targetElement = elementPath[level];
    if (targetElement) {
      currentTarget = targetElement;
      const tagName = targetElement.tagName.toLowerCase();
      log(simpleTemplate(t("log.elementScan.adjustingLevel"), { level, tagName }));
      updateHighlight(targetElement);
    }
  }
  function processTextsWithWorker(texts) {
    return new Promise((resolve, reject) => {
      const { filterRules: filterRules2, enableDebugLogging } = loadSettings();
      const runFallback = () => {
        log(t("log.elementScan.switchToFallback"));
        showNotification(t("notifications.cspWorkerWarning"), { type: "info", duration: 5e3 });
        try {
          const result = performScanInMainThread2(texts, filterRules2, enableDebugLogging);
          updateScanCount(result.count, "element");
          resolve(result);
        } catch (fallbackError) {
          log(t("log.elementScan.fallbackFailed", { error: fallbackError.message }), "error");
          reject(fallbackError);
        }
      };
      try {
        log(t("log.elementScan.worker.starting"));
        const workerScript = `(() => {
  // src/shared/i18n/en.json
  var en_default = {
    common: {
      scan: "Scan",
      stop: "Stop",
      resume: "Resume",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      discovered: "Discovered:",
      confirm: "Confirm",
      cancel: "Cancel",
      export: "Export",
      reselect: "Reselect",
      stage: "Stage"
    },
    export: {
      exportAsTxt: "Export as TXT",
      exportAsJson: "Export as JSON",
      exportAsCsv: "Export as CSV",
      csv: {
        id: "ID",
        original: "Original",
        translation: "Translation"
      }
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      language: "Language",
      relatedSettings: "Related Settings",
      filterRules: "Content Filtering Rules",
      filters: {
        numbers: "Filter Numbers/Currency",
        chinese: "Filter Chinese-Only Text",
        contains_chinese: "Filter Text Containing Chinese",
        emoji_only: "Filter Emoji-Only Text",
        symbols: "Filter Symbol-Only Text",
        term: "Filter Specific Terms",
        single_letter: "Filter Single English Letters",
        repeating_chars: "Filter Repeating Characters",
        file_paths: "Filter File Paths",
        hex_color_codes: "Filter Hex Color Codes",
        email_addresses: "Filter Email Addresses",
        uuids: "Filter UUIDs",
        git_commit_hashes: "Filter Git Commit Hashes",
        website_urls: "Filter Website URLs",
        website_urls_title: "Filter Website URLs",
        shorthand_numbers: "Filter Shorthand Numbers",
        shorthand_numbers_title: "Filter Shorthand Numbers"
      },
      display: {
        show_fab: "Show Floating Button",
        fab_position: "Floating Button Position",
        fab_positions: {
          bottom_right: "Bottom Right",
          top_right: "Top Right",
          bottom_left: "Bottom Left",
          top_left: "Top Left"
        },
        show_line_numbers: "Show Line Numbers",
        show_statistics: "Show Statistics",
        enable_word_wrap: "Enable Word Wrap",
        text_truncation_limit: "Enable Text Truncation Limit",
        character_limit: "Character Limit",
        show_scan_count: "Enable Scan Count in Title"
      },
      advanced: {
        enable_debug_logging: "Enable Debug Logging"
      },
      panel: {
        title: "Settings Panel"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "Light",
        dark: "Dark",
        system: "System"
      }
    },
    scan: {
      quick: "Quick Scan",
      session: "Session Scan",
      stagedCount: "Staged:",
      elementFinished: "Element scan finished, found {{count}} items.",
      startSession: "Start Dynamic Scan Session",
      stopSession: "Stop Dynamic Scan Session",
      finished: "Scan finished, found {{count}} items.",
      quickFinished: "Quick scan finished, found {{count}} items.",
      sessionStarted: "Session scan started.",
      sessionInProgress: "Scan in progress...",
      truncationWarning: "To maintain UI fluency, only a portion of the text is displayed here. The full content will be available upon export."
    },
    results: {
      title: "Extracted Text",
      scanCountSession: "Scanned {{count}} items",
      scanCountStatic: "Total {{count}} items scanned",
      totalCharacters: "Total Characters",
      totalLines: "Total Lines",
      noSummary: "No summary available",
      stats: {
        lines: "Lines",
        chars: "Chars"
      }
    },
    notifications: {
      copiedToClipboard: "Copied to clipboard!",
      settingsSaved: "Settings saved!",
      modalInitError: "Modal not initialized.",
      nothingToCopy: "Nothing to copy.",
      contentCleared: "Content cleared.",
      noTextSelected: "No text selected.",
      scanFailed: "Scan failed.",
      elementScanStarted: "Element scan started.",
      cspWorkerWarning: "Switched to compatibility scan mode due to website security restrictions."
    },
    placeholders: {
      click: "Click ",
      dynamicScan: "[Dynamic Scan]",
      startNewScanSession: " to start a new scan session",
      staticScan: "[Static Scan]",
      performOneTimeScan: " to perform a one-time quick extraction"
    },
    confirmation: {
      clear: "Are you sure you want to clear the content? This action cannot be undone."
    },
    tooltip: {
      summary: "View Summary",
      dynamic_scan: "Dynamic Scan",
      static_scan: "Static Scan",
      element_scan: "Element Scan",
      disabled: {
        scan_in_progress: "Another scan is in progress"
      },
      filters: {
        title: "Content Filter Explanation",
        numbers: 'This rule filters out text that consists <strong>entirely</strong> of numbers, spaces, thousand separators (.), decimal points (,), and some currency symbols ($, \\u20AC, \\xA3, \\xA5).<br><br><strong>More Examples:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: 'This rule filters out text that consists <strong>entirely</strong> of Chinese characters and spaces, excluding any punctuation.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (will be filtered)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (will not be filtered)',
        contains_chinese: \`This rule filters out <strong>any</strong> text that contains at least one Chinese character, regardless of other characters.<br><br><strong>Examples:</strong><br>\\u2022 "\\u4F60\\u597D World" (will be filtered)<br>\\u2022 "Chapter 1" (will be filtered, as '\\u7B2C 1 \\u7AE0' contains '\\u7B2C' and '\\u7AE0')\`,
        emoji_only: 'This rule filters out text that consists <strong>entirely</strong> of one or more emoji characters and spaces.<br><br><strong>Examples:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: 'This rule filters out text that consists <strong>entirely</strong> of various punctuation and symbols.<br><br><strong>More Examples:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: 'This rule filters out common UI terms that typically do not require translation.<br><br><strong>More Examples:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: 'This rule filters out text consisting of a <strong>single</strong> English letter, case-insensitive.<br><br><strong>Examples:</strong><br>\\u2022 "A" (will be filtered)<br>\\u2022 "b" (will be filtered)<br>\\u2022 "AB" (will not be filtered)',
        repeating_chars: 'This rule filters out text composed of the <strong>same character</strong> repeating 2 or more times consecutively.<br><br><strong>Examples:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: 'This rule attempts to identify and filter out text that resembles an operating system file path and <strong>includes a file extension</strong>. It does not match URLs.<br><br><strong>More Examples:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: 'This rule filters out standard CSS hexadecimal color codes (3, 4, 6, or 8 digits, the latter including an alpha channel).<br><br><strong>Examples:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4-digit)<br>\\u2022 "#ff000080" (8-digit)',
        email_addresses: 'This rule filters out text that matches the standard format of an email address.<br><br><strong>Examples:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: 'This rule filters out Universally Unique Identifiers (UUIDs).<br><br><strong>Example:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: 'This rule filters out standard Git commit hashes (long or short).<br><br><strong>Examples:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: 'This rule filters out text that is a <strong>standalone URL</strong>. It is designed to be strict to avoid accidentally removing text that is not a link.<br><br><strong>More Examples:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: 'This rule filters out numbers that use <strong>common shorthand suffixes</strong> for thousands (k), millions (m), or billions (b), case-insensitive.<br><br><strong>More Examples:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "Display Settings Explanation",
        show_fab: "Control whether to display the <strong>Floating Action Button (FAB)</strong> in the bottom-right corner of webpages. This serves as the primary entry point for both static and dynamic text extraction. <br><br>If you disable this button, you can re-enable it via the settings panel in the Tampermonkey extension menu.",
        show_scan_count: "When enabled, the title bar of the results window will show a <strong>real-time count</strong> of the total text items found in the current scan. This is especially useful for monitoring the progress of a long-running <strong>Dynamic Scan</strong>.",
        show_line_numbers: "Displays line numbers to the left of the text area in the results window. This provides a <strong>precise reference point</strong> when you need to discuss or note a specific line of text.",
        show_statistics: "Displays <strong>real-time statistics</strong> about the extracted content in the status bar at the bottom of the results window, including <strong>total lines</strong> and <strong>total characters</strong>. This helps you quickly assess the volume of the content.",
        enable_word_wrap: "Controls how long lines of text are displayed in the results window.<br><br>\\u2022 <strong>Enabled:</strong> Long lines will wrap to fit the window's width.<br>\\u2022 <strong>Disabled:</strong> Long lines will remain on a single line, causing a horizontal scrollbar to appear.",
        text_truncation_limit: "This is a <strong>performance-saving</strong> feature. If the script extracts an <strong>extremely long single line of text</strong> (e.g., a base64 encoded image), it could cause the browser to <strong>lag or become unresponsive</strong>.<br><br>This setting truncates any single line exceeding the specified length to ensure the UI remains smooth. <strong>Note: This only affects the display; the exported file will still contain the full, untruncated content.</strong>"
      },
      advanced: {
        title: "Advanced Settings Explanation",
        enable_debug_logging: "When enabled, the script will output detailed internal status, execution steps, and error messages to the browser's <strong>Developer Tools Console</strong> (usually opened with F12). This is primarily for developers or users who need to submit detailed bug reports."
      }
    },
    log: {
      prefix: "[Text Extractor Script-Debug]",
      language: {
        switched: "Language switched to: {{lang}}",
        notFound: "Language '{{lang}}' not found, falling back to 'en'."
      },
      settings: {
        changed: "Setting '{{key}}' changed from '{{oldValue}}' to '{{newValue}}'",
        filterRuleChanged: {
          enabled: "Filter rule '{{key}}' has been enabled",
          disabled: "Filter rule '{{key}}' has been disabled"
        },
        panel: {
          opening: "Opening settings panel...",
          closing: "Closing settings panel...",
          saving: "Saving settings..."
        },
        parseError: "Error parsing saved settings:",
        invalidObject: "Attempted to save an invalid object for settings:"
      },
      textProcessor: {
        filtered: 'Text filtered: "{{text}}" (Reason: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[Quick Scan] Switching to main thread fallback.",
        fallbackFailed: "[Quick Scan] Main thread fallback failed: {{error}}",
        fallback: {
          starting: "[Quick Scan - Fallback] Starting processing in main thread...",
          completed: "[Quick Scan - Fallback] Processing complete, found {{count}} unique texts."
        },
        worker: {
          logPrefix: "[Quick Scan Worker]",
          starting: "[Quick Scan] Starting execution, attempting to use Web Worker...",
          completed: "[Quick Scan] Worker processing successful, received {{count}} texts.",
          scanComplete: "[Quick Scan Worker] Processing complete, found {{count}} unique texts. Sending back to main thread...",
          initFailed: "[Quick Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Quick Scan] Original error: {{error}}",
          sendingData: "[Quick Scan] Web Worker created, sending {{count}} texts for processing...",
          initSyncError: "[Quick Scan] Synchronous error during Worker initialization: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[Session Scan] Switching to main thread fallback.",
        domObserver: {
          stopped: "[Session Scan] Stopped listening for DOM changes."
        },
        fallback: {
          initialized: "[Session Scan - Fallback] Initialized.",
          cleared: "[Session Scan - Fallback] Data cleared."
        },
        worker: {
          logPrefix: "[Session Scan Worker]",
          starting: "Session Scan: Attempting to start Web Worker...",
          initFailed: "[Session Scan] Worker initialization failed. This is likely due to the website's Content Security Policy (CSP).",
          originalError: "[Session Scan] Original error: {{error}}",
          initialized: "[Session Scan] Worker initialized successfully, sent {{count}} initial texts to start the session.",
          initSyncError: "[Session Scan] Synchronous error during Worker initialization: {{error}}",
          clearCommandSent: "[Session Scan] Clear command sent to worker."
        }
      },
      ui: {
        copyButton: {
          copied: "Copy button clicked, copied {{count}} characters.",
          nothingToCopy: "Copy button clicked, but there was no content to copy or the button was disabled."
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "User confirmed clearing session scan texts, invoking callback..."
          },
          quickScan: {
            confirmed: "User confirmed clearing quick scan texts."
          },
          cancelled: "User cancelled the clear operation."
        },
        modal: {
          opening: "Opening main modal...",
          closing: "Closing main modal...",
          scanFailed: "Static scan failed: {{error}}",
          clearContent: "Clear content button clicked."
        }
      },
      exporter: {
        buttonClicked: "Export button clicked, format: {{format}}.",
        csvError: "Error while parsing text and generating CSV: {{error}}",
        fileExported: "File exported: {{filename}}",
        noContent: "No content to export.",
        unknownFormat: "Unknown export format: {{format}}"
      },
      main: {
        requestingSessionScanData: "Requesting full data from session-scan mode...",
        exportingQuickScanData: "Exporting full data from quick-scan mode's memory...",
        inIframe: "Script is in an iframe, skipping initialization.",
        initializing: "Script initialization started...",
        initialSettingsLoaded: "Initial settings loaded:"
      },
      dom: {
        ttpCreationError: "Failed to create Trusted Type policy:",
        svgParseError: "Invalid or failed to parse SVG string:"
      },
      elementScan: {
        starting: "Element Scan started.",
        stopping: "Element Scan stopped.",
        listenersAdded: "Global event listeners for element scan added.",
        listenersRemoved: "Global event listeners for element scan removed.",
        stateReset: "Element scan state has been reset.",
        reselecting: "Returning to element reselection mode.",
        hovering: "Hovering over <{{tagName}}>.",
        escapePressed: "Escape key pressed, stopping element scan.",
        clickedEnteringAdjust: "Element <{{tagName}}> clicked, entering adjustment mode.",
        pathBuilt: "Element path built, depth: {{depth}}.",
        adjustingLevel: "Adjusting selection level to {{level}} ({{tagName}}).",
        confirmExtracting: "Selection confirmed, extracting text from <{{tagName}}>.",
        staged: "Element staged. Total staged: {{count}}.",
        confirmingStaged: "Confirming selection. Processing {{count}} staged elements.",
        extractedCount: "Extracted {{count}} raw text fragments from element.",
        confirmFailedNoTarget: "Confirmation failed: no target element selected.",
        rightClickExit: "Right-click detected, stopping element scan.",
        processingError: "An error occurred during text processing: {{error}}",
        scrollListenersAdded: "Added {{count}} scroll listeners to parent elements.",
        scrollListenersRemoved: "Removed all scroll listeners.",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "Element Scan Worker is starting...",
          sendingData: "Sending {{count}} text fragments to Element Scan Worker.",
          completed: "Element Scan Worker completed, found {{count}} unique texts.",
          initFailed: "Element Scan Worker initialization failed. The browser's CSP might be blocking data: URLs.",
          initSyncError: "Synchronous error during Element Scan Worker initialization: {{error}}",
          originalError: "Original worker error: {{error}}"
        },
        switchToFallback: "Switching to main thread fallback for Element Scan.",
        fallbackFailed: "Element Scan fallback mode failed: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "Element Scan UI: Creating highlight elements for the first time.",
        updatingHighlight: "Element Scan UI: Updating highlight for <{{tagName}}>.",
        creatingToolbar: "Element Scan UI: Creating adjustment toolbar.",
        toolbarPositioned: "Element Scan UI: Toolbar positioned.",
        sliderChanged: "Element Scan UI: Slider changed to level {{level}}",
        reselectClicked: "Element Scan UI: 'Reselect' button clicked.",
        stageClicked: "Element Scan UI: 'Stage' button clicked.",
        cancelClicked: "Element Scan UI: 'Cancel' button clicked.",
        confirmClicked: "Element Scan UI: 'Confirm' button clicked.",
        dragStarted: "Element Scan UI: Drag started.",
        dragEnded: "Element Scan UI: Drag ended.",
        cleaningHighlights: "Element Scan UI: Cleaning up highlight elements.",
        cleaningToolbar: "Element Scan UI: Cleaning up toolbar."
      },
      eventBus: {
        callbackError: "Error in callback for event '{{eventName}}':"
      },
      trustedTypes: {
        workerPolicyError: "Failed to create Trusted Types worker policy:",
        htmlPolicyError: "Failed to create Trusted Types HTML policy:",
        defaultWorkerPolicyWarning: "Trusted Types default policy failed for worker URL, falling back to raw URL.",
        defaultHtmlPolicyWarning: "Trusted Types default policy failed for HTML, falling back to raw string."
      }
    },
    tutorial: {
      elementScanTitle: "Element Scan Guide",
      elementScan: '<p class="tutorial-content">This is a placeholder for the element scan tutorial. Rich text is supported.</p>'
    }
  };
  // src/shared/i18n/zh-CN.json
  var zh_CN_default = {
    common: {
      scan: "\\u626B\\u63CF",
      stop: "\\u505C\\u6B62",
      resume: "\\u6062\\u590D",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u590D\\u5236",
      save: "\\u4FDD\\u5B58",
      discovered: "\\u5DF2\\u53D1\\u73B0:",
      confirm: "\\u786E\\u8BA4",
      cancel: "\\u53D6\\u6D88",
      export: "\\u5BFC\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9009\\u62E9",
      stage: "\\u6682\\u5B58"
    },
    export: {
      exportAsTxt: "\\u5BFC\\u51FA\\u4E3A TXT",
      exportAsJson: "\\u5BFC\\u51FA\\u4E3A JSON",
      exportAsCsv: "\\u5BFC\\u51FA\\u4E3A CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8BD1\\u6587"
      }
    },
    settings: {
      title: "\\u8BBE\\u7F6E",
      theme: "\\u4E3B\\u9898",
      language: "\\u8BED\\u8A00",
      relatedSettings: "\\u76F8\\u5173\\u8BBE\\u7F6E",
      filterRules: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u89C4\\u5219",
      filters: {
        numbers: "\\u8FC7\\u6EE4\\u6570\\u5B57/\\u8D27\\u5E01",
        chinese: "\\u8FC7\\u6EE4\\u7EAF\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u8FC7\\u6EE4\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u8FC7\\u6EE4\\u7EAF\\u8868\\u60C5\\u7B26\\u53F7\\u6587\\u672C",
        symbols: "\\u8FC7\\u6EE4\\u7EAF\\u7B26\\u53F7\\u6587\\u672C",
        term: "\\u8FC7\\u6EE4\\u7279\\u5B9A\\u672F\\u8BED",
        single_letter: "\\u8FC7\\u6EE4\\u5355\\u4E2A\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u8FC7\\u6EE4\\u91CD\\u590D\\u5B57\\u7B26",
        file_paths: "\\u8FC7\\u6EE4\\u6587\\u4EF6\\u8DEF\\u5F84",
        hex_color_codes: "\\u8FC7\\u6EE4\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801",
        email_addresses: "\\u8FC7\\u6EE4\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740",
        uuids: "\\u8FC7\\u6EE4 UUID",
        git_commit_hashes: "\\u8FC7\\u6EE4 Git \\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C",
        website_urls: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        website_urls_title: "\\u8FC7\\u6EE4\\u7F51\\u7AD9\\u94FE\\u63A5",
        shorthand_numbers: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57",
        shorthand_numbers_title: "\\u8FC7\\u6EE4\\u901F\\u8BB0\\u6570\\u5B57"
      },
      display: {
        show_fab: "\\u663E\\u793A\\u60AC\\u6D6E\\u6309\\u94AE",
        fab_position: "\\u60AC\\u6D6E\\u6309\\u94AE\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u53F3\\u4E0B\\u89D2",
          top_right: "\\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u663E\\u793A\\u884C\\u53F7",
        show_statistics: "\\u663E\\u793A\\u7EDF\\u8BA1\\u4FE1\\u606F",
        enable_word_wrap: "\\u542F\\u7528\\u81EA\\u52A8\\u6362\\u884C",
        text_truncation_limit: "\\u542F\\u7528\\u6587\\u672C\\u622A\\u65AD\\u9650\\u5236",
        character_limit: "\\u5B57\\u7B26\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6807\\u9898\\u4E2D\\u542F\\u7528\\u626B\\u63CF\\u8BA1\\u6570"
      },
      advanced: {
        enable_debug_logging: "\\u542F\\u7528\\u8C03\\u8BD5\\u65E5\\u5FD7\\u8BB0\\u5F55"
      },
      panel: {
        title: "\\u8BBE\\u7F6E\\u9762\\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6D45\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u968F\\u7CFB\\u7EDF"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u626B\\u63CF",
      session: "\\u4F1A\\u8BDD\\u626B\\u63CF",
      stagedCount: "\\u5DF2\\u6682\\u5B58:",
      elementFinished: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      startSession: "\\u5F00\\u59CB\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      stopSession: "\\u505C\\u6B62\\u52A8\\u6001\\u626B\\u63CF\\u4F1A\\u8BDD",
      finished: "\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u626B\\u63CF\\u5B8C\\u6210\\uFF0C\\u53D1\\u73B0 {{count}} \\u6761\\u6587\\u672C\\u3002",
      sessionStarted: "\\u4F1A\\u8BDD\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      sessionInProgress: "\\u626B\\u63CF\\u8FDB\\u884C\\u4E2D...",
      truncationWarning: "\\u4E3A\\u4FDD\\u6301\\u754C\\u9762\\u6D41\\u7545\\uFF0C\\u6B64\\u5904\\u4EC5\\u663E\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u5BFC\\u51FA\\u540E\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u5185\\u5BB9\\u3002"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      scanCountSession: "\\u5DF2\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      scanCountStatic: "\\u5171\\u626B\\u63CF {{count}} \\u4E2A\\u9879\\u76EE",
      totalCharacters: "\\u603B\\u5B57\\u7B26\\u6570",
      totalLines: "\\u603B\\u884C\\u6570",
      noSummary: "\\u65E0\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u7B26"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u590D\\u5236\\u5230\\u526A\\u8D34\\u677F\\uFF01",
      settingsSaved: "\\u8BBE\\u7F6E\\u5DF2\\u4FDD\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u6001\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6CA1\\u6709\\u53EF\\u590D\\u5236\\u7684\\u5185\\u5BB9\\u3002",
      contentCleared: "\\u5185\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u626B\\u63CF\\u5931\\u8D25\\u3002",
      elementScanStarted: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
      cspWorkerWarning: "\\u56E0\\u7F51\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u6362\\u81F3\\u517C\\u5BB9\\u626B\\u63CF\\u6A21\\u5F0F\\u3002"
    },
    placeholders: {
      click: "\\u70B9\\u51FB ",
      dynamicScan: "[\\u52A8\\u6001\\u626B\\u63CF]",
      startNewScanSession: " \\u5F00\\u59CB\\u65B0\\u7684\\u626B\\u63CF\\u4F1A\\u8BDD",
      staticScan: "[\\u9759\\u6001\\u626B\\u63CF]",
      performOneTimeScan: " \\u6267\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u786E\\u5B9A\\u8981\\u6E05\\u9664\\u5185\\u5BB9\\u5417\\uFF1F\\u6B64\\u64CD\\u4F5C\\u65E0\\u6CD5\\u64A4\\u9500\\u3002"
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      dynamic_scan: "\\u52A8\\u6001\\u626B\\u63CF",
      static_scan: "\\u9759\\u6001\\u626B\\u63CF",
      element_scan: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF",
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9879\\u626B\\u63CF\\u6B63\\u5728\\u8FDB\\u884C\\u4E2D"
      },
      filters: {
        title: "\\u5185\\u5BB9\\u8FC7\\u6EE4\\u5668\\u8BF4\\u660E",
        numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6570\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6570\\u70B9(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8D27\\u5E01\\u7B26\\u53F7($, \\u20AC, \\xA3, \\xA5)\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6C49\\u5B57\\u548C\\u7A7A\\u683C\\u7EC4\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6807\\u70B9\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        contains_chinese: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u4E2A\\u6C49\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u65E0\\u8BBA\\u5176\\u4ED6\\u5B57\\u7B26\\u662F\\u4EC0\\u4E48\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C06\\u88AB\\u8FC7\\u6EE4)',
        emoji_only: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u4E2A\\u6216\\u591A\\u4E2A\\u8868\\u60C5\\u7B26\\u53F7\\u53CA\\u7A7A\\u683C\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u79CD\\u6807\\u70B9\\u548C\\u7B26\\u53F7\\u7EC4\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8BD1\\u7684\\u5E38\\u89C1UI\\u672F\\u8BED\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u5355\\u4E2A</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7EC4\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "A" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "b" (\\u5C06\\u88AB\\u8FC7\\u6EE4)<br>\\u2022 "AB" (\\u4E0D\\u4F1A\\u88AB\\u8FC7\\u6EE4)',
        repeating_chars: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7531<strong>\\u540C\\u4E00\\u4E2A\\u5B57\\u7B26</strong>\\u8FDE\\u7EED\\u91CD\\u590D2\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u89C4\\u5219\\u5C1D\\u8BD5\\u8BC6\\u522B\\u5E76\\u8FC7\\u6EE4\\u6389\\u7C7B\\u4F3C\\u64CD\\u4F5C\\u7CFB\\u7EDF\\u6587\\u4EF6\\u8DEF\\u5F84\\u4E14<strong>\\u5305\\u542B\\u6587\\u4EF6\\u6269\\u5C55\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7F51\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684CSS\\u5341\\u516D\\u8FDB\\u5236\\u989C\\u8272\\u4EE3\\u7801\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u540E\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u7B26\\u5408\\u6807\\u51C6\\u7535\\u5B50\\u90AE\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u901A\\u7528\\u552F\\u4E00\\u6807\\u8BC6\\u7B26 (UUID)\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u6807\\u51C6\\u7684Git\\u63D0\\u4EA4\\u54C8\\u5E0C\\u503C\\uFF08\\u957F\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u793A\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389<strong>\\u72EC\\u7ACB\\u7684\\u7F51\\u5740</strong>\\u3002\\u5B83\\u8BBE\\u8BA1\\u5F97\\u6BD4\\u8F83\\u4E25\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u94FE\\u63A5\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u89C4\\u5219\\u8FC7\\u6EE4\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u89C1\\u901F\\u8BB0\\u540E\\u7F00</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u4E07(m)\\u6216\\u5341\\u4EBF(b)\\u7684\\u6570\\u5B57\\uFF08\\u4E0D\\u533A\\u5206\\u5927\\u5C0F\\u5199\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u793A\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u663E\\u793A\\u8BBE\\u7F6E\\u8BF4\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7F51\\u9875\\u53F3\\u4E0B\\u89D2\\u663E\\u793A<strong>\\u60AC\\u6D6E\\u64CD\\u4F5C\\u6309\\u94AE(FAB)</strong>\\u3002\\u8FD9\\u662F\\u8FDB\\u884C\\u9759\\u6001\\u548C\\u52A8\\u6001\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u94AE\\uFF0C\\u53EF\\u4EE5\\u901A\\u8FC7\\u6CB9\\u7334\\u6269\\u5C55\\u83DC\\u5355\\u4E2D\\u7684\\u8BBE\\u7F6E\\u9762\\u677F\\u91CD\\u65B0\\u542F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u542F\\u7528\\u540E\\uFF0C\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6807\\u9898\\u680F\\u5C06<strong>\\u5B9E\\u65F6\\u663E\\u793A</strong>\\u5F53\\u524D\\u626B\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u603B\\u6587\\u672C\\u9879\\u76EE\\u6570\\u3002\\u8FD9\\u5BF9\\u4E8E\\u76D1\\u63A7\\u957F\\u65F6\\u95F4\\u8FD0\\u884C\\u7684<strong>\\u52A8\\u6001\\u626B\\u63CF</strong>\\u7684\\u8FDB\\u5EA6\\u7279\\u522B\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u7684\\u6587\\u672C\\u533A\\u57DF\\u5DE6\\u4FA7\\u663E\\u793A\\u884C\\u53F7\\u3002\\u5F53\\u60A8\\u9700\\u8981\\u8BA8\\u8BBA\\u6216\\u8BB0\\u5F55\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u65F6\\uFF0C\\u8FD9\\u63D0\\u4F9B\\u4E86\\u4E00\\u4E2A<strong>\\u7CBE\\u786E\\u7684\\u53C2\\u8003\\u70B9</strong>\\u3002",
        show_statistics: "\\u5728\\u7ED3\\u679C\\u7A97\\u53E3\\u5E95\\u90E8\\u7684\\u72B6\\u6001\\u680F\\u4E2D\\u663E\\u793A\\u6709\\u5173\\u63D0\\u53D6\\u5185\\u5BB9\\u7684<strong>\\u5B9E\\u65F6\\u7EDF\\u8BA1\\u6570\\u636E</strong>\\uFF0C\\u5305\\u62EC<strong>\\u603B\\u884C\\u6570</strong>\\u548C<strong>\\u603B\\u5B57\\u7B26\\u6570</strong>\\u3002\\u8FD9\\u6709\\u52A9\\u4E8E\\u60A8\\u5FEB\\u901F\\u8BC4\\u4F30\\u5185\\u5BB9\\u7684\\u4F53\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7ED3\\u679C\\u7A97\\u53E3\\u4E2D\\u957F\\u6587\\u672C\\u884C\\u7684\\u663E\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u542F\\u7528:</strong> \\u957F\\u884C\\u5C06\\u81EA\\u52A8\\u6362\\u884C\\u4EE5\\u9002\\u5E94\\u7A97\\u53E3\\u5BBD\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u957F\\u884C\\u5C06\\u4FDD\\u6301\\u5728\\u5355\\u884C\\uFF0C\\u5E76\\u51FA\\u73B0\\u6C34\\u5E73\\u6EDA\\u52A8\\u6761\\u3002",
        text_truncation_limit: "\\u8FD9\\u662F\\u4E00\\u4E2A<strong>\\u6027\\u80FD\\u4F18\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u811A\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6781\\u957F\\u7684\\u5355\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7F16\\u7801\\u7684\\u56FE\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u4F1A\\u5BFC\\u81F4\\u6D4F\\u89C8\\u5668<strong>\\u5361\\u987F\\u6216\\u65E0\\u54CD\\u5E94</strong>\\u3002<br><br>\\u6B64\\u8BBE\\u7F6E\\u4F1A\\u622A\\u65AD\\u4EFB\\u4F55\\u8D85\\u8FC7\\u6307\\u5B9A\\u957F\\u5EA6\\u7684\\u5355\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u786E\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u7545\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u8FD9\\u4EC5\\u5F71\\u54CD\\u663E\\u793A\\uFF1B\\u5BFC\\u51FA\\u7684\\u6587\\u4EF6\\u4ECD\\u5C06\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65AD\\u7684\\u5185\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9AD8\\u7EA7\\u8BBE\\u7F6E\\u8BF4\\u660E",
        enable_debug_logging: "\\u542F\\u7528\\u540E\\uFF0C\\u811A\\u672C\\u4F1A\\u5C06\\u8BE6\\u7EC6\\u7684\\u5185\\u90E8\\u72B6\\u6001\\u3001\\u6267\\u884C\\u6B65\\u9AA4\\u548C\\u9519\\u8BEF\\u4FE1\\u606F\\u8F93\\u51FA\\u5230\\u6D4F\\u89C8\\u5668\\u7684<strong>\\u5F00\\u53D1\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u6253\\u5F00\\uFF09\\u3002\\u8FD9\\u4E3B\\u8981\\u4F9B\\u5F00\\u53D1\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8BE6\\u7EC6\\u9519\\u8BEF\\u62A5\\u544A\\u7684\\u7528\\u6237\\u4F7F\\u7528\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u811A\\u672C-\\u8C03\\u8BD5]",
      language: {
        switched: "\\u8BED\\u8A00\\u5DF2\\u5207\\u6362\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8BED\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8BBE\\u7F6E '{{key}}' \\u5DF2\\u4ECE '{{oldValue}}' \\u66F4\\u6539\\u4E3A '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u542F\\u7528",
          disabled: "\\u8FC7\\u6EE4\\u89C4\\u5219 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u8BBE\\u7F6E\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u8BBE\\u7F6E\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u4FDD\\u5B58\\u8BBE\\u7F6E..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u4FDD\\u5B58\\u7684\\u8BBE\\u7F6E\\u65F6\\u51FA\\u9519\\uFF1A",
        invalidObject: "\\u8BD5\\u56FE\\u4E3A\\u8BBE\\u7F6E\\u4FDD\\u5B58\\u4E00\\u4E2A\\u65E0\\u6548\\u5BF9\\u8C61\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u8FC7\\u6EE4: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u6B63\\u5728\\u4E3B\\u7EBF\\u7A0B\\u4E2D\\u5F00\\u59CB\\u5904\\u7406...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF - \\u5907\\u9009] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u626B\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u5F00\\u59CB\\u6267\\u884C\\uFF0C\\u5C1D\\u8BD5\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u5904\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u6761\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u626B\\u63CF Worker] \\u5904\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002\\u6B63\\u5728\\u53D1\\u56DE\\u4E3B\\u7EBF\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u626B\\u63CF] Web Worker \\u5DF2\\u521B\\u5EFA\\uFF0C\\u6B63\\u5728\\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u8FDB\\u884C\\u5904\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u6B63\\u5728\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        domObserver: {
          stopped: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u5DF2\\u505C\\u6B62\\u76D1\\u542C DOM \\u53D8\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u4F1A\\u8BDD\\u626B\\u63CF - \\u5907\\u9009] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u4F1A\\u8BDD\\u626B\\u63CF - \\u5907\\u9009] \\u6570\\u636E\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u4F1A\\u8BDD\\u626B\\u63CF Worker]",
          starting: "\\u4F1A\\u8BDD\\u626B\\u63CF\\uFF1A\\u6B63\\u5728\\u5C1D\\u8BD5\\u542F\\u52A8 Web Worker...",
          initFailed: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u8FD9\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u4E8E\\u7F51\\u7AD9\\u7684\\u5185\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5BFC\\u81F4\\u7684\\u3002",
          originalError: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u539F\\u59CB\\u9519\\u8BEF: {{error}}",
          initialized: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u53D1\\u9001 {{count}} \\u6761\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u5F00\\u59CB\\u4F1A\\u8BDD\\u3002",
          initSyncError: "[\\u4F1A\\u8BDD\\u626B\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          clearCommandSent: "[\\u4F1A\\u8BDD\\u626B\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u53D1\\u9001\\u81F3 worker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u590D\\u5236\\u4E86 {{count}} \\u4E2A\\u5B57\\u7B26\\u3002",
          nothingToCopy: "\\u590D\\u5236\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u4F46\\u6CA1\\u6709\\u5185\\u5BB9\\u53EF\\u590D\\u5236\\u6216\\u6309\\u94AE\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u4F1A\\u8BDD\\u626B\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8C03\\u7528\\u56DE\\u8C03..."
          },
          quickScan: {
            confirmed: "\\u7528\\u6237\\u5DF2\\u786E\\u8BA4\\u6E05\\u9664\\u5FEB\\u901F\\u626B\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u7528\\u6237\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u6253\\u5F00\\u4E3B\\u6A21\\u6001\\u6846...",
          closing: "\\u6B63\\u5728\\u5173\\u95ED\\u4E3B\\u6A21\\u6001\\u6846...",
          scanFailed: "\\u9759\\u6001\\u626B\\u63CF\\u5931\\u8D25: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5185\\u5BB9\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\u3002"
        }
      },
      exporter: {
        buttonClicked: "\\u5BFC\\u51FA\\u6309\\u94AE\\u5DF2\\u70B9\\u51FB\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u5E76\\u751F\\u6210CSV\\u65F6\\u51FA\\u9519: {{error}}",
        fileExported: "\\u6587\\u4EF6\\u5DF2\\u5BFC\\u51FA: {{filename}}",
        noContent: "\\u65E0\\u5185\\u5BB9\\u53EF\\u5BFC\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u5BFC\\u51FA\\u683C\\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8BF7\\u6C42\\u4F1A\\u8BDD\\u626B\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        exportingQuickScanData: "\\u6B63\\u5728\\u5BFC\\u51FA\\u5FEB\\u901F\\u626B\\u63CF\\u6A21\\u5F0F\\u5185\\u5B58\\u4E2D\\u7684\\u5B8C\\u6574\\u6570\\u636E...",
        inIframe: "\\u811A\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u8FC7\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u811A\\u672C\\u521D\\u59CB\\u5316\\u5F00\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8BBE\\u7F6E\\u5DF2\\u52A0\\u8F7D:"
      },
      dom: {
        ttpCreationError: "\\u521B\\u5EFA Trusted Type \\u7B56\\u7565\\u5931\\u8D25:",
        svgParseError: "SVG \\u5B57\\u7B26\\u4E32\\u65E0\\u6548\\u6216\\u89E3\\u6790\\u5931\\u8D25:"
      },
      elementScan: {
        starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u5F00\\u59CB\\u3002",
        stopping: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6DFB\\u52A0\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u79FB\\u9664\\u5168\\u5C40\\u4E8B\\u4EF6\\u76D1\\u542C\\u5668\\u3002",
        stateReset: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u72B6\\u6001\\u5DF2\\u91CD\\u7F6E\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9009\\u62E9\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u60AC\\u505C\\u4E8E <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u952E\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u8FDB\\u5165\\u8C03\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C42\\u7EA7\\u8DEF\\u5F84\\u5DF2\\u6784\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u4E3A\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8C03\\u6574\\u9009\\u62E9\\u5C42\\u7EA7\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9009\\u62E9\\u5DF2\\u786E\\u8BA4\\uFF0C\\u6B63\\u5728\\u4ECE <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u6682\\u5B58\\u3002\\u603B\\u6570\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u786E\\u8BA4\\u9009\\u62E9\\u3002\\u6B63\\u5728\\u5904\\u7406 {{count}} \\u4E2A\\u5DF2\\u6682\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u4ECE\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u6761\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u786E\\u8BA4\\u5931\\u8D25\\uFF1A\\u672A\\u9009\\u62E9\\u4EFB\\u4F55\\u76EE\\u6807\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u68C0\\u6D4B\\u5230\\u53F3\\u952E\\u70B9\\u51FB\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u5904\\u7406\\u8FC7\\u7A0B\\u4E2D\\u53D1\\u751F\\u9519\\u8BEF: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u4E3A {{count}} \\u4E2A\\u7236\\u5143\\u7D20\\u6DFB\\u52A0\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EDA\\u52A8\\u76D1\\u542C\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u6B63\\u5728\\u542F\\u52A8...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u53D1\\u9001 {{count}} \\u6761\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u6761\\u4E0D\\u91CD\\u590D\\u6587\\u672C\\u3002",
          initFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u8D25\\u3002\\u6D4F\\u89C8\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u95F4\\u53D1\\u751F\\u540C\\u6B65\\u9519\\u8BEF: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u9519\\u8BEF: {{error}}"
        },
        switchToFallback: "\\u6B63\\u5728\\u4E3A\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5207\\u6362\\u5230\\u4E3B\\u7EBF\\u7A0B\\u5907\\u9009\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u5907\\u9009\\u65B9\\u6848\\u6267\\u884C\\u5931\\u8D25: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u9996\\u6B21\\u521B\\u5EFA\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u4E3A <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u521B\\u5EFA\\u8C03\\u6574\\u5DE5\\u5177\\u680F\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u680F\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6ED1\\u5757\\u5C42\\u7EA7\\u53D8\\u4E3A {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u91CD\\u65B0\\u9009\\u62E9\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        stageClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u6682\\u5B58\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u53D6\\u6D88\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u201C\\u786E\\u8BA4\\u201D\\u6309\\u94AE\\u88AB\\u70B9\\u51FB\\u3002",
        dragStarted: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u5F00\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u62D6\\u52A8\\u7ED3\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u626B\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u680F\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u8C03\\u51FD\\u6570\\u51FA\\u9519:"
      },
      trustedTypes: {
        workerPolicyError: "\\u521B\\u5EFA Trusted Types worker \\u7B56\\u7565\\u5931\\u8D25:",
        htmlPolicyError: "\\u521B\\u5EFA Trusted Types HTML \\u7B56\\u7565\\u5931\\u8D25:",
        defaultWorkerPolicyWarning: "\\u7528\\u4E8E worker URL \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u4E8E HTML \\u7684 Trusted Types \\u9ED8\\u8BA4\\u7B56\\u7565\\u5931\\u8D25\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u7B26\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B",
      elementScan: '<p class="tutorial-content">\\u8FD9\\u662F\\u4E00\\u4E2A\\u7528\\u4E8E\\u9009\\u53D6\\u5143\\u7D20\\u626B\\u63CF\\u6559\\u7A0B\\u7684\\u5360\\u4F4D\\u7B26\\u3002\\u652F\\u6301\\u5BCC\\u6587\\u672C\\u683C\\u5F0F\\u3002</p>'
    }
  };
  // src/shared/i18n/zh-TW.json
  var zh_TW_default = {
    common: {
      scan: "\\u6383\\u63CF",
      stop: "\\u505C\\u6B62",
      resume: "\\u6062\\u5FA9",
      clear: "\\u6E05\\u7A7A",
      copy: "\\u8907\\u88FD",
      save: "\\u5132\\u5B58",
      discovered: "\\u5DF2\\u767C\\u73FE:",
      confirm: "\\u78BA\\u8A8D",
      cancel: "\\u53D6\\u6D88",
      export: "\\u532F\\u51FA",
      reselect: "\\u91CD\\u65B0\\u9078\\u64C7",
      stage: "\\u66AB\\u5B58"
    },
    export: {
      exportAsTxt: "\\u532F\\u51FA\\u70BA TXT",
      exportAsJson: "\\u532F\\u51FA\\u70BA JSON",
      exportAsCsv: "\\u532F\\u51FA\\u70BA CSV",
      csv: {
        id: "ID",
        original: "\\u539F\\u6587",
        translation: "\\u8B6F\\u6587"
      }
    },
    settings: {
      title: "\\u8A2D\\u5B9A",
      theme: "\\u4E3B\\u984C",
      language: "\\u8A9E\\u8A00",
      relatedSettings: "\\u76F8\\u95DC\\u8A2D\\u5B9A",
      filterRules: "\\u5167\\u5BB9\\u904E\\u6FFE\\u898F\\u5247",
      filters: {
        numbers: "\\u904E\\u6FFE\\u6578\\u5B57/\\u8CA8\\u5E63",
        chinese: "\\u904E\\u6FFE\\u7D14\\u4E2D\\u6587\\u6587\\u672C",
        contains_chinese: "\\u904E\\u6FFE\\u542B\\u4E2D\\u6587\\u7684\\u6587\\u672C",
        emoji_only: "\\u904E\\u6FFE\\u7D14\\u8868\\u60C5\\u7B26\\u865F\\u6587\\u672C",
        symbols: "\\u904E\\u6FFE\\u7D14\\u7B26\\u865F\\u6587\\u672C",
        term: "\\u904E\\u6FFE\\u7279\\u5B9A\\u8853\\u8A9E",
        single_letter: "\\u904E\\u6FFE\\u55AE\\u500B\\u82F1\\u6587\\u5B57\\u6BCD",
        repeating_chars: "\\u904E\\u6FFE\\u91CD\\u8907\\u5B57\\u5143",
        file_paths: "\\u904E\\u6FFE\\u6A94\\u6848\\u8DEF\\u5F91",
        hex_color_codes: "\\u904E\\u6FFE\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC",
        email_addresses: "\\u904E\\u6FFE\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740",
        uuids: "\\u904E\\u6FFE UUID",
        git_commit_hashes: "\\u904E\\u6FFE Git \\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C",
        website_urls: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        website_urls_title: "\\u904E\\u6FFE\\u7DB2\\u7AD9\\u9023\\u7D50",
        shorthand_numbers: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57",
        shorthand_numbers_title: "\\u904E\\u6FFE\\u901F\\u8A18\\u6578\\u5B57"
      },
      display: {
        show_fab: "\\u986F\\u793A\\u61F8\\u6D6E\\u6309\\u9215",
        fab_position: "\\u61F8\\u6D6E\\u6309\\u9215\\u4F4D\\u7F6E",
        fab_positions: {
          bottom_right: "\\u53F3\\u4E0B\\u89D2",
          top_right: "\\u53F3\\u4E0A\\u89D2",
          bottom_left: "\\u5DE6\\u4E0B\\u89D2",
          top_left: "\\u5DE6\\u4E0A\\u89D2"
        },
        show_line_numbers: "\\u986F\\u793A\\u884C\\u865F",
        show_statistics: "\\u986F\\u793A\\u7D71\\u8A08\\u8CC7\\u8A0A",
        enable_word_wrap: "\\u555F\\u7528\\u81EA\\u52D5\\u63DB\\u884C",
        text_truncation_limit: "\\u555F\\u7528\\u6587\\u672C\\u622A\\u65B7\\u9650\\u5236",
        character_limit: "\\u5B57\\u5143\\u9650\\u5236",
        show_scan_count: "\\u5728\\u6A19\\u984C\\u4E2D\\u555F\\u7528\\u6383\\u63CF\\u8A08\\u6578"
      },
      advanced: {
        enable_debug_logging: "\\u555F\\u7528\\u5075\\u932F\\u65E5\\u8A8C\\u8A18\\u9304"
      },
      panel: {
        title: "\\u8A2D\\u5B9A\\u9762\\u677F"
      },
      languages: {
        en: "English",
        zh_CN: "\\u7B80\\u4F53\\u4E2D\\u6587",
        zh_TW: "\\u7E41\\u9AD4\\u4E2D\\u6587"
      },
      themes: {
        light: "\\u6DFA\\u8272",
        dark: "\\u6DF1\\u8272",
        system: "\\u8DDF\\u96A8\\u7CFB\\u7D71"
      }
    },
    scan: {
      quick: "\\u5FEB\\u901F\\u6383\\u63CF",
      session: "\\u6703\\u8A71\\u6383\\u63CF",
      stagedCount: "\\u5DF2\\u66AB\\u5B58:",
      elementFinished: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      startSession: "\\u958B\\u59CB\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      stopSession: "\\u505C\\u6B62\\u52D5\\u614B\\u6383\\u63CF\\u6703\\u8A71",
      finished: "\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      quickFinished: "\\u5FEB\\u901F\\u6383\\u63CF\\u5B8C\\u6210\\uFF0C\\u767C\\u73FE {{count}} \\u689D\\u6587\\u672C\\u3002",
      sessionStarted: "\\u6703\\u8A71\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      sessionInProgress: "\\u6383\\u63CF\\u9032\\u884C\\u4E2D...",
      truncationWarning: "\\u70BA\\u4FDD\\u6301\\u4ECB\\u9762\\u6D41\\u66A2\\uFF0C\\u6B64\\u8655\\u50C5\\u986F\\u793A\\u90E8\\u5206\\u6587\\u672C\\u3002\\u532F\\u51FA\\u5F8C\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u5167\\u5BB9\\u3002"
    },
    results: {
      title: "\\u63D0\\u53D6\\u7684\\u6587\\u672C",
      scanCountSession: "\\u5DF2\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      scanCountStatic: "\\u5171\\u6383\\u63CF {{count}} \\u500B\\u9805\\u76EE",
      totalCharacters: "\\u7E3D\\u5B57\\u5143\\u6578",
      totalLines: "\\u7E3D\\u884C\\u6578",
      noSummary: "\\u7121\\u53EF\\u7528\\u6458\\u8981",
      stats: {
        lines: "\\u884C",
        chars: "\\u5B57\\u5143"
      }
    },
    notifications: {
      copiedToClipboard: "\\u5DF2\\u8907\\u88FD\\u5230\\u526A\\u8CBC\\u7C3F\\uFF01",
      settingsSaved: "\\u8A2D\\u5B9A\\u5DF2\\u5132\\u5B58\\uFF01",
      modalInitError: "\\u6A21\\u614B\\u6846\\u672A\\u521D\\u59CB\\u5316\\u3002",
      nothingToCopy: "\\u6C92\\u6709\\u53EF\\u8907\\u88FD\\u7684\\u5167\\u5BB9\\u3002",
      contentCleared: "\\u5167\\u5BB9\\u5DF2\\u6E05\\u9664\\u3002",
      noTextSelected: "\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u6587\\u672C\\u3002",
      scanFailed: "\\u6383\\u63CF\\u5931\\u6557\\u3002",
      elementScanStarted: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
      cspWorkerWarning: "\\u56E0\\u7DB2\\u7AD9\\u5B89\\u5168\\u9650\\u5236\\uFF0C\\u5DF2\\u5207\\u63DB\\u81F3\\u76F8\\u5BB9\\u6383\\u63CF\\u6A21\\u5F0F\\u3002"
    },
    placeholders: {
      click: "\\u9EDE\\u64CA ",
      dynamicScan: "[\\u52D5\\u614B\\u6383\\u63CF]",
      startNewScanSession: " \\u958B\\u59CB\\u65B0\\u7684\\u6383\\u63CF\\u6703\\u8A71",
      staticScan: "[\\u975C\\u614B\\u6383\\u63CF]",
      performOneTimeScan: " \\u57F7\\u884C\\u4E00\\u6B21\\u6027\\u5FEB\\u901F\\u63D0\\u53D6"
    },
    confirmation: {
      clear: "\\u60A8\\u78BA\\u5B9A\\u8981\\u6E05\\u9664\\u5167\\u5BB9\\u55CE\\uFF1F\\u6B64\\u64CD\\u4F5C\\u7121\\u6CD5\\u64A4\\u92B7\\u3002"
    },
    tooltip: {
      summary: "\\u67E5\\u770B\\u6458\\u8981",
      dynamic_scan: "\\u52D5\\u614B\\u6383\\u63CF",
      static_scan: "\\u975C\\u614B\\u6383\\u63CF",
      element_scan: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF",
      disabled: {
        scan_in_progress: "\\u53E6\\u4E00\\u9805\\u6383\\u63CF\\u6B63\\u5728\\u9032\\u884C\\u4E2D"
      },
      filters: {
        title: "\\u5167\\u5BB9\\u904E\\u6FFE\\u5668\\u8AAA\\u660E",
        numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6578\\u5B57\\u3001\\u7A7A\\u683C\\u3001\\u5343\\u4F4D\\u5206\\u9694\\u7B26(,)\\u3001\\u5C0F\\u6578\\u9EDE(.)\\u4EE5\\u53CA\\u90E8\\u5206\\u8CA8\\u5E63\\u7B26\\u865F($, \\u20AC, \\xA3, \\xA5)\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1,234.56"<br>\\u2022 "\\xA5999"<br>\\u2022 "\\u20AC200"<br>\\u2022 "$ 100"',
        chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u6F22\\u5B57\\u548C\\u7A7A\\u683C\\u7D44\\u6210\\uFF0C\\u4E14\\u4E0D\\u542B\\u4EFB\\u4F55\\u6A19\\u9EDE\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D \\u4E16\\u754C" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u4F60\\u597D\\uFF0C\\u4E16\\u754C" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        contains_chinese: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4EFB\\u4F55\\u542B\\u6709\\u81F3\\u5C11\\u4E00\\u500B\\u6F22\\u5B57\\u7684\\u6587\\u672C\\uFF0C\\u7121\\u8AD6\\u5176\\u4ED6\\u5B57\\u5143\\u662F\\u4EC0\\u9EBC\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u4F60\\u597D World" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "\\u7B2C\\u4E00\\u7AE0" (\\u5C07\\u88AB\\u904E\\u6FFE)',
        emoji_only: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u4E00\\u500B\\u6216\\u591A\\u500B\\u8868\\u60C5\\u7B26\\u865F\\u53CA\\u7A7A\\u683C\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "\\u{1F44D}"<br>\\u2022 "\\u{1F60A} \\u{1F389} \\u{1F680}"',
        symbols: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u5B8C\\u5168</strong>\\u7531\\u5404\\u7A2E\\u6A19\\u9EDE\\u548C\\u7B26\\u865F\\u7D44\\u6210\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "@#*&^%"<br>\\u2022 "()[]{}"<br>\\u2022 "---...---"',
        term: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u5E38\\u4E0D\\u9700\\u8981\\u7FFB\\u8B6F\\u7684\\u5E38\\u898BUI\\u8853\\u8A9E\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "OK", "Cancel", "Submit"<br>\\u2022 "Login", "Settings", "Help"',
        single_letter: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u55AE\\u500B</strong>\\u82F1\\u6587\\u5B57\\u6BCD\\u7D44\\u6210\\u7684\\u6587\\u672C\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "A" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "b" (\\u5C07\\u88AB\\u904E\\u6FFE)<br>\\u2022 "AB" (\\u4E0D\\u6703\\u88AB\\u904E\\u6FFE)',
        repeating_chars: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7531<strong>\\u540C\\u4E00\\u500B\\u5B57\\u5143</strong>\\u9023\\u7E8C\\u91CD\\u89072\\u6B21\\u6216\\u4EE5\\u4E0A\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "aa"<br>\\u2022 "======"<br>\\u2022 "bbbbb"',
        file_paths: '\\u6B64\\u898F\\u5247\\u5617\\u8A66\\u8B58\\u5225\\u4E26\\u904E\\u6FFE\\u6389\\u985E\\u4F3C\\u4F5C\\u696D\\u7CFB\\u7D71\\u6A94\\u6848\\u8DEF\\u5F91\\u4E14<strong>\\u5305\\u542B\\u6A94\\u6848\\u526F\\u6A94\\u540D</strong>\\u7684\\u6587\\u672C\\u3002\\u5B83\\u4E0D\\u5339\\u914D\\u7DB2\\u5740\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "/path/to/file.js"<br>\\u2022 "C:\\\\Users\\\\Test\\\\document.docx"<br>\\u2022 "./config.json"',
        hex_color_codes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684CSS\\u5341\\u516D\\u9032\\u4F4D\\u984F\\u8272\\u4EE3\\u78BC\\uFF083\\u30014\\u30016\\u62168\\u4F4D\\uFF0C\\u5F8C\\u8005\\u5305\\u542B\\u900F\\u660E\\u5EA6\\u901A\\u9053\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "#FFFFFF"<br>\\u2022 "#ff0000"<br>\\u2022 "#f0c"<br>\\u2022 "#f0c8" (4\\u4F4D)<br>\\u2022 "#ff000080" (8\\u4F4D)',
        email_addresses: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u7B26\\u5408\\u6A19\\u6E96\\u96FB\\u5B50\\u90F5\\u4EF6\\u5730\\u5740\\u683C\\u5F0F\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "example@domain.com"<br>\\u2022 "user.name@sub.domain.org"',
        uuids: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u901A\\u7528\\u552F\\u4E00\\u8B58\\u5225\\u78BC (UUID)\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "123e4567-e89b-12d3-a456-426614174000"',
        git_commit_hashes: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u6A19\\u6E96\\u7684Git\\u63D0\\u4EA4\\u96DC\\u6E4A\\u503C\\uFF08\\u9577\\u6216\\u77ED\\uFF09\\u3002<br><br><strong>\\u7BC4\\u4F8B:</strong><br>\\u2022 "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2"<br>\\u2022 "a1b2c3d"',
        website_urls: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389<strong>\\u7368\\u7ACB\\u7684\\u7DB2\\u5740</strong>\\u3002\\u5B83\\u8A2D\\u8A08\\u5F97\\u6BD4\\u8F03\\u56B4\\u683C\\uFF0C\\u4EE5\\u907F\\u514D\\u610F\\u5916\\u79FB\\u9664\\u4E0D\\u662F\\u9023\\u7D50\\u7684\\u6587\\u672C\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "https://www.example.com"<br>\\u2022 "http://test.co.uk"<br>\\u2022 "www.google.com"<br>\\u2022 "example.org"',
        shorthand_numbers: '\\u6B64\\u898F\\u5247\\u904E\\u6FFE\\u6389\\u4F7F\\u7528<strong>\\u5E38\\u898B\\u901F\\u8A18\\u5F8C\\u7DB4</strong>\\u8868\\u793A\\u5343(k)\\u3001\\u767E\\u842C(m)\\u6216\\u5341\\u5104(b)\\u7684\\u6578\\u5B57\\uFF08\\u4E0D\\u5340\\u5206\\u5927\\u5C0F\\u5BEB\\uFF09\\u3002<br><br><strong>\\u66F4\\u591A\\u7BC4\\u4F8B:</strong><br>\\u2022 "1.2k"<br>\\u2022 "15M"<br>\\u2022 "2.5b"<br>\\u2022 "100K"'
      },
      display: {
        title: "\\u986F\\u793A\\u8A2D\\u5B9A\\u8AAA\\u660E",
        show_fab: "\\u63A7\\u5236\\u662F\\u5426\\u5728\\u7DB2\\u9801\\u53F3\\u4E0B\\u89D2\\u986F\\u793A<strong>\\u61F8\\u6D6E\\u64CD\\u4F5C\\u6309\\u9215(FAB)</strong>\\u3002\\u9019\\u662F\\u9032\\u884C\\u975C\\u614B\\u548C\\u52D5\\u614B\\u6587\\u672C\\u63D0\\u53D6\\u7684\\u4E3B\\u8981\\u5165\\u53E3\\u3002<br><br>\\u5982\\u679C\\u60A8\\u7981\\u7528\\u4E86\\u6B64\\u6309\\u9215\\uFF0C\\u53EF\\u4EE5\\u900F\\u904E\\u6CB9\\u7334\\u64F4\\u5145\\u5957\\u4EF6\\u9078\\u55AE\\u4E2D\\u7684\\u8A2D\\u5B9A\\u9762\\u677F\\u91CD\\u65B0\\u555F\\u7528\\u5B83\\u3002",
        show_scan_count: "\\u555F\\u7528\\u5F8C\\uFF0C\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6A19\\u984C\\u5217\\u5C07<strong>\\u5373\\u6642\\u986F\\u793A</strong>\\u76EE\\u524D\\u6383\\u63CF\\u4E2D\\u627E\\u5230\\u7684\\u7E3D\\u6587\\u672C\\u9805\\u76EE\\u6578\\u3002\\u9019\\u5C0D\\u65BC\\u76E3\\u63A7\\u9577\\u6642\\u9593\\u57F7\\u884C\\u7684<strong>\\u52D5\\u614B\\u6383\\u63CF</strong>\\u7684\\u9032\\u5EA6\\u7279\\u5225\\u6709\\u7528\\u3002",
        show_line_numbers: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u7684\\u6587\\u672C\\u5340\\u57DF\\u5DE6\\u5074\\u986F\\u793A\\u884C\\u865F\\u3002\\u7576\\u60A8\\u9700\\u8981\\u8A0E\\u8AD6\\u6216\\u8A18\\u9304\\u7279\\u5B9A\\u6587\\u672C\\u884C\\u6642\\uFF0C\\u9019\\u63D0\\u4F9B\\u4E86\\u4E00\\u500B<strong>\\u7CBE\\u78BA\\u7684\\u53C3\\u8003\\u9EDE</strong>\\u3002",
        show_statistics: "\\u5728\\u7D50\\u679C\\u8996\\u7A97\\u5E95\\u90E8\\u7684\\u72C0\\u614B\\u5217\\u4E2D\\u986F\\u793A\\u6709\\u95DC\\u63D0\\u53D6\\u5167\\u5BB9\\u7684<strong>\\u5373\\u6642\\u7D71\\u8A08\\u6578\\u64DA</strong>\\uFF0C\\u5305\\u62EC<strong>\\u7E3D\\u884C\\u6578</strong>\\u548C<strong>\\u7E3D\\u5B57\\u5143\\u6578</strong>\\u3002\\u9019\\u6709\\u52A9\\u65BC\\u60A8\\u5FEB\\u901F\\u8A55\\u4F30\\u5167\\u5BB9\\u7684\\u9AD4\\u91CF\\u3002",
        enable_word_wrap: "\\u63A7\\u5236\\u7D50\\u679C\\u8996\\u7A97\\u4E2D\\u9577\\u6587\\u672C\\u884C\\u7684\\u986F\\u793A\\u65B9\\u5F0F\\u3002<br><br>\\u2022 <strong>\\u555F\\u7528:</strong> \\u9577\\u884C\\u5C07\\u81EA\\u52D5\\u63DB\\u884C\\u4EE5\\u9069\\u61C9\\u8996\\u7A97\\u5BEC\\u5EA6\\u3002<br>\\u2022 <strong>\\u7981\\u7528:</strong> \\u9577\\u884C\\u5C07\\u4FDD\\u6301\\u5728\\u55AE\\u884C\\uFF0C\\u4E26\\u51FA\\u73FE\\u6C34\\u5E73\\u6372\\u8EF8\\u3002",
        text_truncation_limit: "\\u9019\\u662F\\u4E00\\u500B<strong>\\u6548\\u80FD\\u512A\\u5316</strong>\\u529F\\u80FD\\u3002\\u5982\\u679C\\u8173\\u672C\\u63D0\\u53D6\\u5230<strong>\\u6975\\u9577\\u7684\\u55AE\\u884C\\u6587\\u672C</strong>\\uFF08\\u4F8B\\u5982\\uFF0Cbase64\\u7DE8\\u78BC\\u7684\\u5716\\u7247\\uFF09\\uFF0C\\u53EF\\u80FD\\u6703\\u5C0E\\u81F4\\u700F\\u89BD\\u5668<strong>\\u5361\\u9813\\u6216\\u7121\\u56DE\\u61C9</strong>\\u3002<br><br>\\u6B64\\u8A2D\\u5B9A\\u6703\\u622A\\u65B7\\u4EFB\\u4F55\\u8D85\\u904E\\u6307\\u5B9A\\u9577\\u5EA6\\u7684\\u55AE\\u884C\\u6587\\u672C\\uFF0C\\u4EE5\\u78BA\\u4FDDUI\\u4FDD\\u6301\\u6D41\\u66A2\\u3002<strong>\\u6CE8\\u610F\\uFF1A\\u9019\\u50C5\\u5F71\\u97FF\\u986F\\u793A\\uFF1B\\u532F\\u51FA\\u7684\\u6A94\\u6848\\u4ECD\\u5C07\\u5305\\u542B\\u5B8C\\u6574\\u7684\\u3001\\u672A\\u622A\\u65B7\\u7684\\u5167\\u5BB9\\u3002</strong>"
      },
      advanced: {
        title: "\\u9032\\u968E\\u8A2D\\u5B9A\\u8AAA\\u660E",
        enable_debug_logging: "\\u555F\\u7528\\u5F8C\\uFF0C\\u8173\\u672C\\u6703\\u5C07\\u8A73\\u7D30\\u7684\\u5167\\u90E8\\u72C0\\u614B\\u3001\\u57F7\\u884C\\u6B65\\u9A5F\\u548C\\u932F\\u8AA4\\u8A0A\\u606F\\u8F38\\u51FA\\u5230\\u700F\\u89BD\\u5668\\u7684<strong>\\u958B\\u767C\\u8005\\u5DE5\\u5177\\u63A7\\u5236\\u53F0</strong>\\uFF08\\u901A\\u5E38\\u7528F12\\u958B\\u555F\\uFF09\\u3002\\u9019\\u4E3B\\u8981\\u4F9B\\u958B\\u767C\\u8005\\u6216\\u9700\\u8981\\u63D0\\u4EA4\\u8A73\\u7D30\\u932F\\u8AA4\\u5831\\u544A\\u7684\\u4F7F\\u7528\\u8005\\u4F7F\\u7528\\u3002"
      }
    },
    log: {
      prefix: "[\\u6587\\u672C\\u63D0\\u53D6\\u8173\\u672C-\\u5075\\u932F]",
      language: {
        switched: "\\u8A9E\\u8A00\\u5DF2\\u5207\\u63DB\\u81F3\\uFF1A{{lang}}",
        notFound: "\\u672A\\u627E\\u5230\\u8A9E\\u8A00 '{{lang}}'\\uFF0C\\u5DF2\\u56DE\\u9000\\u81F3 'en'\\u3002"
      },
      settings: {
        changed: "\\u8A2D\\u5B9A '{{key}}' \\u5DF2\\u5F9E '{{oldValue}}' \\u8B8A\\u66F4\\u70BA '{{newValue}}'",
        filterRuleChanged: {
          enabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u555F\\u7528",
          disabled: "\\u904E\\u6FFE\\u898F\\u5247 '{{key}}' \\u5DF2\\u7981\\u7528"
        },
        panel: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u8A2D\\u5B9A\\u9762\\u677F...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u8A2D\\u5B9A\\u9762\\u677F...",
          saving: "\\u6B63\\u5728\\u5132\\u5B58\\u8A2D\\u5B9A..."
        },
        parseError: "\\u89E3\\u6790\\u5DF2\\u5132\\u5B58\\u7684\\u8A2D\\u5B9A\\u6642\\u51FA\\u932F\\uFF1A",
        invalidObject: "\\u8A66\\u5716\\u70BA\\u8A2D\\u5B9A\\u5132\\u5B58\\u4E00\\u500B\\u7121\\u6548\\u7269\\u4EF6\\uFF1A"
      },
      textProcessor: {
        filtered: '\\u6587\\u672C\\u5DF2\\u904E\\u6FFE: "{{text}}" (\\u539F\\u56E0: {{reason}})'
      },
      quickScan: {
        switchToFallback: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}",
        fallback: {
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u6B63\\u5728\\u4E3B\\u7DDA\\u7A0B\\u4E2D\\u958B\\u59CB\\u8655\\u7406...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF - \\u5099\\u9078] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002"
        },
        worker: {
          logPrefix: "[\\u5FEB\\u901F\\u6383\\u63CF Worker]",
          starting: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u958B\\u59CB\\u57F7\\u884C\\uFF0C\\u5617\\u8A66\\u4F7F\\u7528 Web Worker...",
          completed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u8655\\u7406\\u6210\\u529F\\uFF0C\\u6536\\u5230 {{count}} \\u689D\\u6587\\u672C\\u3002",
          scanComplete: "[\\u5FEB\\u901F\\u6383\\u63CF Worker] \\u8655\\u7406\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002\\u6B63\\u5728\\u767C\\u56DE\\u4E3B\\u7DDA\\u7A0B...",
          initFailed: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u5FEB\\u901F\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          sendingData: "[\\u5FEB\\u901F\\u6383\\u63CF] Web Worker \\u5DF2\\u5EFA\\u7ACB\\uFF0C\\u6B63\\u5728\\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u9032\\u884C\\u8655\\u7406...",
          initSyncError: "[\\u5FEB\\u901F\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}"
        }
      },
      sessionScan: {
        switchToFallback: "[\\u6703\\u8A71\\u6383\\u63CF] \\u6B63\\u5728\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        domObserver: {
          stopped: "[\\u6703\\u8A71\\u6383\\u63CF] \\u5DF2\\u505C\\u6B62\\u76E3\\u807D DOM \\u8B8A\\u5316\\u3002"
        },
        fallback: {
          initialized: "[\\u6703\\u8A71\\u6383\\u63CF - \\u5099\\u9078] \\u5DF2\\u521D\\u59CB\\u5316\\u3002",
          cleared: "[\\u6703\\u8A71\\u6383\\u63CF - \\u5099\\u9078] \\u8CC7\\u6599\\u5DF2\\u6E05\\u9664\\u3002"
        },
        worker: {
          logPrefix: "[\\u6703\\u8A71\\u6383\\u63CF Worker]",
          starting: "\\u6703\\u8A71\\u6383\\u63CF\\uFF1A\\u6B63\\u5728\\u5617\\u8A66\\u555F\\u52D5 Web Worker...",
          initFailed: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u9019\\u5F88\\u53EF\\u80FD\\u662F\\u7531\\u65BC\\u7DB2\\u7AD9\\u7684\\u5167\\u5BB9\\u5B89\\u5168\\u7B56\\u7565 (CSP) \\u5C0E\\u81F4\\u7684\\u3002",
          originalError: "[\\u6703\\u8A71\\u6383\\u63CF] \\u539F\\u59CB\\u932F\\u8AA4: {{error}}",
          initialized: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u6210\\u529F\\uFF0C\\u5DF2\\u767C\\u9001 {{count}} \\u689D\\u521D\\u59CB\\u6587\\u672C\\u4EE5\\u958B\\u59CB\\u6703\\u8A71\\u3002",
          initSyncError: "[\\u6703\\u8A71\\u6383\\u63CF] Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          clearCommandSent: "[\\u6703\\u8A71\\u6383\\u63CF] \\u6E05\\u9664\\u547D\\u4EE4\\u5DF2\\u767C\\u9001\\u81F3 worker\\u3002"
        }
      },
      ui: {
        copyButton: {
          copied: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u8907\\u88FD\\u4E86 {{count}} \\u500B\\u5B57\\u5143\\u3002",
          nothingToCopy: "\\u8907\\u88FD\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u4F46\\u6C92\\u6709\\u5167\\u5BB9\\u53EF\\u8907\\u88FD\\u6216\\u6309\\u9215\\u88AB\\u7981\\u7528\\u3002"
        },
        confirmationModal: {
          sessionScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u6703\\u8A71\\u6383\\u63CF\\u6587\\u672C\\uFF0C\\u6B63\\u5728\\u8ABF\\u7528\\u56DE\\u547C..."
          },
          quickScan: {
            confirmed: "\\u4F7F\\u7528\\u8005\\u5DF2\\u78BA\\u8A8D\\u6E05\\u9664\\u5FEB\\u901F\\u6383\\u63CF\\u6587\\u672C\\u3002"
          },
          cancelled: "\\u4F7F\\u7528\\u8005\\u5DF2\\u53D6\\u6D88\\u6E05\\u9664\\u64CD\\u4F5C\\u3002"
        },
        modal: {
          opening: "\\u6B63\\u5728\\u958B\\u555F\\u4E3B\\u6A21\\u614B\\u6846...",
          closing: "\\u6B63\\u5728\\u95DC\\u9589\\u4E3B\\u6A21\\u614B\\u6846...",
          scanFailed: "\\u975C\\u614B\\u6383\\u63CF\\u5931\\u6557: {{error}}",
          clearContent: "\\u6E05\\u7A7A\\u5167\\u5BB9\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\u3002"
        }
      },
      exporter: {
        buttonClicked: "\\u532F\\u51FA\\u6309\\u9215\\u5DF2\\u9EDE\\u64CA\\uFF0C\\u683C\\u5F0F: {{format}}\\u3002",
        csvError: "\\u89E3\\u6790\\u6587\\u672C\\u4E26\\u7522\\u751FCSV\\u6642\\u51FA\\u932F: {{error}}",
        fileExported: "\\u6A94\\u6848\\u5DF2\\u532F\\u51FA: {{filename}}",
        noContent: "\\u7121\\u5167\\u5BB9\\u53EF\\u532F\\u51FA\\u3002",
        unknownFormat: "\\u672A\\u77E5\\u7684\\u532F\\u51FA\\u683C\\u5F0F: {{format}}"
      },
      main: {
        requestingSessionScanData: "\\u6B63\\u5728\\u8ACB\\u6C42\\u6703\\u8A71\\u6383\\u63CF\\u6A21\\u5F0F\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        exportingQuickScanData: "\\u6B63\\u5728\\u532F\\u51FA\\u5FEB\\u901F\\u6383\\u63CF\\u6A21\\u5F0F\\u8A18\\u61B6\\u9AD4\\u4E2D\\u7684\\u5B8C\\u6574\\u8CC7\\u6599...",
        inIframe: "\\u8173\\u672C\\u5728 iframe \\u4E2D\\uFF0C\\u5DF2\\u8DF3\\u904E\\u521D\\u59CB\\u5316\\u3002",
        initializing: "\\u8173\\u672C\\u521D\\u59CB\\u5316\\u958B\\u59CB...",
        initialSettingsLoaded: "\\u521D\\u59CB\\u8A2D\\u5B9A\\u5DF2\\u8F09\\u5165:"
      },
      dom: {
        ttpCreationError: "\\u5EFA\\u7ACB Trusted Type \\u7B56\\u7565\\u5931\\u6557:",
        svgParseError: "SVG \\u5B57\\u4E32\\u7121\\u6548\\u6216\\u89E3\\u6790\\u5931\\u6557:"
      },
      elementScan: {
        starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u958B\\u59CB\\u3002",
        stopping: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5DF2\\u505C\\u6B62\\u3002",
        listenersAdded: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u65B0\\u589E\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        listenersRemoved: "\\u5DF2\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u79FB\\u9664\\u5168\\u57DF\\u4E8B\\u4EF6\\u76E3\\u807D\\u5668\\u3002",
        stateReset: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u72C0\\u614B\\u5DF2\\u91CD\\u8A2D\\u3002",
        reselecting: "\\u6B63\\u5728\\u8FD4\\u56DE\\u5143\\u7D20\\u91CD\\u65B0\\u9078\\u64C7\\u6A21\\u5F0F\\u3002",
        hovering: "\\u6B63\\u5728\\u61F8\\u505C\\u65BC <{{tagName}}>\\u3002",
        escapePressed: "\\u6309\\u4E0B Escape \\u9375\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        clickedEnteringAdjust: "\\u5143\\u7D20 <{{tagName}}> \\u5DF2\\u88AB\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u9032\\u5165\\u8ABF\\u6574\\u6A21\\u5F0F\\u3002",
        pathBuilt: "\\u5143\\u7D20\\u5C64\\u7D1A\\u8DEF\\u5F91\\u5DF2\\u69CB\\u5EFA\\uFF0C\\u6DF1\\u5EA6\\u70BA\\uFF1A{{depth}}\\u3002",
        adjustingLevel: "\\u6B63\\u5728\\u8ABF\\u6574\\u9078\\u64C7\\u5C64\\u7D1A\\u81F3 {{level}} ({{tagName}})\\u3002",
        confirmExtracting: "\\u9078\\u64C7\\u5DF2\\u78BA\\u8A8D\\uFF0C\\u6B63\\u5728\\u5F9E <{{tagName}}> \\u63D0\\u53D6\\u6587\\u672C\\u3002",
        staged: "\\u5143\\u7D20\\u5DF2\\u66AB\\u5B58\\u3002\\u7E3D\\u6578\\uFF1A{{count}}\\u3002",
        confirmingStaged: "\\u78BA\\u8A8D\\u9078\\u64C7\\u3002\\u6B63\\u5728\\u8655\\u7406 {{count}} \\u500B\\u5DF2\\u66AB\\u5B58\\u7684\\u5143\\u7D20\\u3002",
        extractedCount: "\\u5DF2\\u5F9E\\u5143\\u7D20\\u4E2D\\u63D0\\u53D6 {{count}} \\u689D\\u539F\\u59CB\\u6587\\u672C\\u3002",
        confirmFailedNoTarget: "\\u78BA\\u8A8D\\u5931\\u6557\\uFF1A\\u672A\\u9078\\u64C7\\u4EFB\\u4F55\\u76EE\\u6A19\\u5143\\u7D20\\u3002",
        rightClickExit: "\\u5075\\u6E2C\\u5230\\u53F3\\u9375\\u9EDE\\u64CA\\uFF0C\\u6B63\\u5728\\u505C\\u6B62\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u3002",
        processingError: "\\u6587\\u672C\\u8655\\u7406\\u904E\\u7A0B\\u4E2D\\u767C\\u751F\\u932F\\u8AA4: {{error}}",
        scrollListenersAdded: "\\u5DF2\\u70BA {{count}} \\u500B\\u7236\\u5143\\u7D20\\u65B0\\u589E\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        scrollListenersRemoved: "\\u5DF2\\u79FB\\u9664\\u6240\\u6709\\u6EFE\\u52D5\\u76E3\\u807D\\u5668\\u3002",
        worker: {
          logPrefix: "[ES Worker]",
          starting: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u6B63\\u5728\\u555F\\u52D5...",
          sendingData: "\\u6B63\\u5728\\u5411\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u767C\\u9001 {{count}} \\u689D\\u6587\\u672C\\u7247\\u6BB5\\u3002",
          completed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u5DF2\\u5B8C\\u6210\\uFF0C\\u627E\\u5230 {{count}} \\u689D\\u4E0D\\u91CD\\u8907\\u6587\\u672C\\u3002",
          initFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u5931\\u6557\\u3002\\u700F\\u89BD\\u5668\\u7684CSP\\u53EF\\u80FD\\u963B\\u6B62\\u4E86 data: URL\\u3002",
          initSyncError: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF Worker \\u521D\\u59CB\\u5316\\u671F\\u9593\\u767C\\u751F\\u540C\\u6B65\\u932F\\u8AA4: {{error}}",
          originalError: "\\u539F\\u59CB Worker \\u932F\\u8AA4: {{error}}"
        },
        switchToFallback: "\\u6B63\\u5728\\u70BA\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5207\\u63DB\\u5230\\u4E3B\\u7DDA\\u7A0B\\u5099\\u9078\\u65B9\\u6848\\u3002",
        fallbackFailed: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u5099\\u9078\\u65B9\\u6848\\u57F7\\u884C\\u5931\\u6557: {{error}}"
      },
      elementScanUI: {
        creatingHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u9996\\u6B21\\u5EFA\\u7ACB\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        updatingHighlight: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u70BA <{{tagName}}> \\u66F4\\u65B0\\u9AD8\\u4EAE\\u3002",
        creatingToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u5EFA\\u7ACB\\u8ABF\\u6574\\u5DE5\\u5177\\u5217\\u3002",
        toolbarPositioned: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u5DE5\\u5177\\u5217\\u5DF2\\u5B9A\\u4F4D\\u3002",
        sliderChanged: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6ED1\\u687F\\u5C64\\u7D1A\\u8B8A\\u70BA {{level}}",
        reselectClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u91CD\\u65B0\\u9078\\u64C7\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        stageClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u66AB\\u5B58\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        cancelClicked: "\\u5143\\u7D20\\u6383\\u89C0UI\\uFF1A\\u300C\\u53D6\\u6D88\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        confirmClicked: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u300C\\u78BA\\u8A8D\\u300D\\u6309\\u9215\\u88AB\\u9EDE\\u64CA\\u3002",
        dragStarted: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u958B\\u59CB\\u3002",
        dragEnded: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u62D6\\u52D5\\u7D50\\u675F\\u3002",
        cleaningHighlights: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u9AD8\\u4EAE\\u5143\\u7D20\\u3002",
        cleaningToolbar: "\\u5143\\u7D20\\u6383\\u63CFUI\\uFF1A\\u6B63\\u5728\\u6E05\\u7406\\u5DE5\\u5177\\u5217\\u3002"
      },
      eventBus: {
        callbackError: "\\u4E8B\\u4EF6 '{{eventName}}' \\u7684\\u56DE\\u547C\\u51FD\\u6578\\u51FA\\u932F:"
      },
      trustedTypes: {
        workerPolicyError: "\\u5EFA\\u7ACB Trusted Types worker \\u7B56\\u7565\\u5931\\u6557:",
        htmlPolicyError: "\\u5EFA\\u7ACB Trusted Types HTML \\u7B56\\u7565\\u5931\\u6557:",
        defaultWorkerPolicyWarning: "\\u7528\\u65BC worker URL \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB URL\\u3002",
        defaultHtmlPolicyWarning: "\\u7528\\u65BC HTML \\u7684 Trusted Types \\u9810\\u8A2D\\u7B56\\u7565\\u5931\\u6557\\uFF0C\\u56DE\\u9000\\u5230\\u539F\\u59CB\\u5B57\\u4E32\\u3002"
      }
    },
    tutorial: {
      elementScanTitle: "\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u5B78",
      elementScan: '<p class="tutorial-content">\\u9019\\u662F\\u4E00\\u500B\\u7528\\u65BC\\u9078\\u53D6\\u5143\\u7D20\\u6383\\u63CF\\u6559\\u5B78\\u7684\\u4F54\\u4F4D\\u7B26\\u3002\\u652F\\u63F4\\u5BCC\\u6587\\u672C\\u683C\\u5F0F\\u3002</p>'
    }
  };
  // src/shared/i18n/management/languages.js
  var supportedLanguages = [
    { code: "en", name: "English" },
    { code: "zh-CN", name: "\\u7B80\\u4F53\\u4E2D\\u6587" },
    { code: "zh-TW", name: "\\u7E41\\u9AD4\\u4E2D\\u6587" }
  ];
  // src/shared/i18n/index.js
  var translationModules = {
    en: en_default,
    "zh-CN": zh_CN_default,
    "zh-TW": zh_TW_default
  };
  var translations = supportedLanguages.reduce((acc, lang) => {
    if (translationModules[lang.code]) {
      acc[lang.code] = translationModules[lang.code];
    }
    return acc;
  }, {});
  var currentTranslations = translations.en;
  function t(key, replacements) {
    let value = key.split(".").reduce((obj, k) => {
      if (typeof obj === "object" && obj !== null && k in obj) {
        return obj[k];
      }
      return void 0;
    }, currentTranslations);
    if (value === void 0) {
      return key;
    }
    if (replacements) {
      Object.keys(replacements).forEach((placeholder) => {
        const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
        value = value.replace(regex, replacements[placeholder]);
      });
    }
    return value;
  }
  function getAvailableLanguages() {
    return supportedLanguages.map((lang) => ({
      value: lang.code,
      label: lang.name
    }));
  }
  // src/shared/utils/ignoredTerms.js
  var IGNORED_TERMS = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript",
    "TypeScript",
    "Hugging Face",
    "Google",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "OpenAI",
    "ChatGPT",
    "API",
    "Glossary of computer science",
    "HTML",
    "CSS",
    "JSON",
    "XML",
    "HTTP",
    "HTTPS",
    "URL",
    "IP address",
    "DNS",
    "CPU",
    "GPU",
    "RAM",
    "SSD",
    "USB",
    "Wi-Fi",
    "Bluetooth",
    "VPN",
    "AI"
  ];
  var ignoredTerms_default = IGNORED_TERMS;
  // src/assets/icons/themeIcon.js
  var themeIcon = \`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>\`;
  // src/assets/icons/languageIcon.js
  var languageIcon_default = \`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>\`;
  // src/assets/icons/infoIcon.js
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';
  // src/features/settings/config.js
  var selectSettingsDefinitions = [
    {
      id: "theme-select",
      key: "theme",
      label: "settings.theme",
      icon: themeIcon,
      options: [
        { value: "light", label: "settings.themes.light" },
        { value: "dark", label: "settings.themes.dark" },
        { value: "system", label: "settings.themes.system" }
      ]
    },
    {
      id: "language-select",
      key: "language",
      label: "settings.language",
      icon: languageIcon_default,
      // \u76F4\u63A5\u4ECE i18n \u6A21\u5757\u83B7\u53D6\u8BED\u8A00\u5217\u8868\uFF0C\u5176\u6807\u7B7E\u5DF2\u7ECF\u662F\u539F\u751F\u540D\u79F0\uFF0C\u65E0\u9700\u518D\u7FFB\u8BD1\u3002
      options: getAvailableLanguages()
    }
  ];
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "settings.filters.numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.numbers", text: "tooltip.filters.numbers" } },
    { id: "filter-chinese", key: "chinese", label: "settings.filters.chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.chinese", text: "tooltip.filters.chinese" } },
    { id: "filter-contains-chinese", key: "containsChinese", label: "settings.filters.contains_chinese", tooltip: { titleIcon: infoIcon, title: "settings.filters.contains_chinese", text: "tooltip.filters.contains_chinese" } },
    { id: "filter-emoji-only", key: "emojiOnly", label: "settings.filters.emoji_only", tooltip: { titleIcon: infoIcon, title: "settings.filters.emoji_only", text: "tooltip.filters.emoji_only" } },
    { id: "filter-symbols", key: "symbols", label: "settings.filters.symbols", tooltip: { titleIcon: infoIcon, title: "settings.filters.symbols", text: "tooltip.filters.symbols" } },
    { id: "filter-term", key: "termFilter", label: "settings.filters.term", tooltip: { titleIcon: infoIcon, title: "settings.filters.term", text: "tooltip.filters.term" } },
    { id: "filter-single-letter", key: "singleLetter", label: "settings.filters.single_letter", tooltip: { titleIcon: infoIcon, title: "settings.filters.single_letter", text: "tooltip.filters.single_letter" } },
    {
      id: "filter-repeating-chars",
      key: "repeatingChars",
      label: "settings.filters.repeating_chars",
      tooltip: {
        titleIcon: infoIcon,
        title: "settings.filters.repeating_chars",
        text: "tooltip.filters.repeating_chars"
      }
    },
    { id: "filter-file-paths", key: "filePath", label: "settings.filters.file_paths", tooltip: { titleIcon: infoIcon, title: "settings.filters.file_paths", text: "tooltip.filters.file_paths" } },
    { id: "filter-hex-colors", key: "hexColor", label: "settings.filters.hex_color_codes", tooltip: { titleIcon: infoIcon, title: "settings.filters.hex_color_codes", text: "tooltip.filters.hex_color_codes" } },
    { id: "filter-emails", key: "email", label: "settings.filters.email_addresses", tooltip: { titleIcon: infoIcon, title: "settings.filters.email_addresses", text: "tooltip.filters.email_addresses" } },
    { id: "filter-uuids", key: "uuid", label: "settings.filters.uuids", tooltip: { titleIcon: infoIcon, title: "settings.filters.uuids", text: "tooltip.filters.uuids" } },
    { id: "filter-git-hashes", key: "gitCommitHash", label: "settings.filters.git_commit_hashes", tooltip: { titleIcon: infoIcon, title: "settings.filters.git_commit_hashes", text: "tooltip.filters.git_commit_hashes" } },
    { id: "filter-website-urls", key: "websiteUrl", label: "settings.filters.website_urls", tooltip: { titleIcon: infoIcon, title: "settings.filters.website_urls_title", text: "tooltip.filters.website_urls" } },
    { id: "filter-shorthand-numbers", key: "shorthandNumber", label: "settings.filters.shorthand_numbers", tooltip: { titleIcon: infoIcon, title: "settings.filters.shorthand_numbers_title", text: "tooltip.filters.shorthand_numbers" } }
  ];
  // src/shared/utils/filterLogic.js
  var filterConfigMap = new Map(filterDefinitions.map((def) => [def.key, def.label]));
  var ruleChecks = /* @__PURE__ */ new Map([
    ["numbers", {
      regex: /^[$\\\u20AC\\\xA3\\\xA5\\d,.\\s]+$/,
      label: filterConfigMap.get("numbers")
    }],
    ["chinese", {
      regex: /^[\\u4e00-\\u9fa5\\s]+$/u,
      label: filterConfigMap.get("chinese")
    }],
    ["containsChinese", {
      regex: /[\\u4e00-\\u9fa5]/u,
      label: filterConfigMap.get("containsChinese")
    }],
    ["emojiOnly", {
      regex: /^[\\p{Emoji}\\s]+$/u,
      label: filterConfigMap.get("emojiOnly")
    }],
    ["symbols", {
      // \u8FD9\u4E2A\u903B\u8F91\u6BD4\u8F83\u7279\u6B8A\uFF0C\u662F\u201C\u4E0D\u5305\u542B\u5B57\u6BCD\u6216\u6570\u5B57\u201D\uFF0C\u6240\u4EE5\u6211\u4EEC\u7528\u4E00\u4E2A\u51FD\u6570\u6765\u5904\u7406
      test: (text) => !/[\\p{L}\\p{N}]/u.test(text),
      label: filterConfigMap.get("symbols")
    }],
    ["termFilter", {
      test: (text) => ignoredTerms_default.includes(text),
      label: filterConfigMap.get("termFilter")
    }],
    ["singleLetter", {
      regex: /^[a-zA-Z]$/,
      label: filterConfigMap.get("singleLetter")
    }],
    ["repeatingChars", {
      regex: /^\\s*(.)\\1+\\s*$/,
      label: filterConfigMap.get("repeatingChars")
    }],
    ["filePath", {
      regex: /^(?:[a-zA-Z]:\\\\|\\\\\\\\|~|\\.\\.?\\/)[\\w\\-\\.\\/ \\\\]*[\\w\\-\\.]+\\.[\\w]{2,4}$/,
      label: filterConfigMap.get("filePath")
    }],
    ["hexColor", {
      regex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{8})$/,
      label: filterConfigMap.get("hexColor")
    }],
    ["email", {
      regex: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/,
      label: filterConfigMap.get("email")
    }],
    ["uuid", {
      regex: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      label: filterConfigMap.get("uuid")
    }],
    ["gitCommitHash", {
      regex: /^[0-9a-f]{7,40}$/i,
      label: filterConfigMap.get("gitCommitHash")
    }],
    ["websiteUrl", {
      // \u5339\u914D\u5E38\u89C1\u7684\u7F51\u5740\u683C\u5F0F\uFF0C\u5305\u62EC\u534F\u8BAE\u3001www\u524D\u7F00\u548C\u88F8\u57DF\u540D\uFF0C\u8981\u6C42\u4E25\u683C\u5339\u914D\u6574\u4E2A\u5B57\u7B26\u4E32\u4EE5\u907F\u514D\u8BEF\u4F24\u3002
      regex: /^(?:(?:https?|ftp):\\/\\/)?(?:www\\.)?([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}(?:\\/.*)?$/,
      label: filterConfigMap.get("websiteUrl")
    }],
    ["shorthandNumber", {
      // \u5339\u914D\u5E26k/m/b\u540E\u7F00\u7684\u6570\u5B57\uFF0C\u652F\u6301\u6574\u6570\u3001\u6D6E\u70B9\u6570\u3001\u5927\u5C0F\u5199\u4EE5\u53CA\u53EF\u9009\u7684\u7A7A\u683C\u3002
      regex: /^\\d+(\\.\\d+)?\\s?[kmb]$/i,
      label: filterConfigMap.get("shorthandNumber")
    }]
  ]);
  function shouldFilter(text, filterRules) {
    for (const [key, rule] of ruleChecks.entries()) {
      if (filterRules[key]) {
        const isFiltered = rule.regex ? rule.regex.test(text) : rule.test(text);
        if (isFiltered) {
          return t(rule.label);
        }
      }
    }
    return null;
  }
  // src/shared/utils/formatting.js
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => \`    ["\${text.replace(/"/g, '\\\\"').replace(/\\n/g, "\\\\n")}", ""]\`
    );
    return \`[
\${result.join(",\\n")}
]\`;
  };
  // src/features/element-scan/worker.js
  self.onmessage = (event) => {
    const { type, payload } = event.data;
    const enableDebugLogging = payload.enableDebugLogging || false;
    const translations2 = payload.translations || {};
    const t2 = (key, replacements) => {
      let value = translations2[key] || key;
      if (replacements) {
        let finalReplacements = { ...replacements };
        if (key === "textFiltered" && replacements.reason && translations2.filterReasons) {
          const reasonKey = replacements.reason;
          finalReplacements.reason = translations2.filterReasons[reasonKey] || reasonKey;
        }
        Object.keys(finalReplacements).forEach((placeholder) => {
          const regex = new RegExp(\`{{\${placeholder}}}\`, "g");
          value = value.replace(regex, finalReplacements[placeholder]);
        });
      }
      return value;
    };
    const log2 = (...args) => {
      if (enableDebugLogging) {
        console.log(t2("workerLogPrefix"), ...args);
      }
    };
    if (type === "scan-element") {
      const { texts, filterRules } = payload;
      const uniqueTexts = /* @__PURE__ */ new Set();
      if (Array.isArray(texts)) {
        texts.forEach((rawText) => {
          if (!rawText || typeof rawText !== "string") return;
          const normalizedText = rawText.normalize("NFC");
          const textForFiltering = normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n").trim();
          if (textForFiltering === "") return;
          const filterResult = shouldFilter(textForFiltering, filterRules);
          if (filterResult) {
            log2(t2("textFiltered", { text: textForFiltering, reason: filterResult }));
            return;
          }
          uniqueTexts.add(normalizedText.replace(/(\\r\\n|\\n|\\r)+/g, "\\n"));
        });
      }
      const textsArray = Array.from(uniqueTexts);
      const formattedText = formatTextsForTranslation(textsArray);
      log2(t2("scanComplete", { count: textsArray.length }));
      self.postMessage({
        type: "scanCompleted",
        payload: {
          formattedText,
          count: textsArray.length
        }
      });
    }
  };
})();
`;
        const workerUrl = `data:application/javascript,${encodeURIComponent(workerScript)}`;
        const trustedUrl = createTrustedWorkerUrl(workerUrl);
        const worker2 = new Worker(trustedUrl);
        worker2.onmessage = (event) => {
          const { type, payload } = event.data;
          if (type === "scanCompleted") {
            log(t("log.elementScan.worker.completed", { count: payload.count }));
            updateScanCount(payload.count, "element");
            resolve(payload);
            worker2.terminate();
          }
        };
        worker2.onerror = (error) => {
          log(t("log.elementScan.worker.initFailed"), "warn");
          log(t("log.elementScan.worker.originalError", { error: error.message }), "debug");
          worker2.terminate();
          runFallback();
        };
        log(t("log.elementScan.worker.sendingData", { count: texts.length }));
        const filterReasonTranslations = Object.keys(filterRules2).reduce((acc, key) => {
          acc[key] = t(`settings.filters.${key}`);
          return acc;
        }, {});
        worker2.postMessage({
          type: "scan-element",
          payload: {
            texts,
            filterRules: filterRules2,
            enableDebugLogging,
            translations: {
              workerLogPrefix: t("log.elementScan.worker.logPrefix"),
              textFiltered: t("log.textProcessor.filtered"),
              scanComplete: t("log.elementScan.worker.completed"),
              filterReasons: filterReasonTranslations
            }
          }
        });
      } catch (e) {
        log(t("log.elementScan.worker.initSyncError", { error: e.message }), "error");
        runFallback();
      }
    });
  }
  async function confirmSelectionAndExtract() {
    if (!currentTarget) {
      log(t("log.elementScan.confirmFailedNoTarget"));
      return;
    }
    const newTexts = extractAndProcessTextFromElement(currentTarget);
    newTexts.forEach((text) => stagedTexts.add(text));
    updateStagedCount();
    const totalToProcess = stagedTexts.size;
    log(simpleTemplate(t("log.elementScan.confirmingStaged"), { count: totalToProcess }));
    isAdjusting = true;
    document.removeEventListener("mouseover", handleMouseOver);
    document.removeEventListener("mouseout", handleMouseOut);
    cleanupUI();
    cleanupToolbar();
    removeScrollListeners();
    setShouldResumeAfterModalClose(true);
    try {
      const allCleanTexts = Array.from(stagedTexts);
      log(simpleTemplate(t("log.elementScan.extractedCount"), { count: allCleanTexts.length }));
      const { formattedText, count } = await processTextsWithWorker(allCleanTexts);
      updateModalContent(formattedText, true, "element-scan");
      const notificationText = simpleTemplate(t("scan.elementFinished"), { count });
      showNotification(notificationText, { type: "success" });
    } catch (error) {
      log(t("log.elementScan.processingError", { error: error.message }), "error");
      showNotification(t("notifications.scanFailed"), { type: "error" });
      stopElementScan();
    }
  }
  function handleSummaryClick() {
    log(t("tooltip.summary"));
    if (isElementScanActive()) {
      const stagedTexts2 = getStagedTexts();
      const formattedText = formatTextsForTranslation(Array.from(stagedTexts2));
      updateScanCount(stagedTexts2.size, "element-scan");
      if (stagedTexts2.size === 0) {
        updateModalContent(SHOW_PLACEHOLDER, true, "element-scan");
      } else {
        updateModalContent(formattedText, true, "element-scan");
      }
    } else {
      showSessionSummary();
    }
  }
  function initUI() {
    const settings = loadSettings();
    createMainModal();
    createFab({
      callbacks: {
        onStaticExtract: handleQuickScanClick,
        onDynamicExtract: handleDynamicExtractClick,
        onSummary: handleSummaryClick,
        onElementScan: handleElementScanClick
      },
      isVisible: settings.showFab
    });
    on("modalClosed", () => {
      if (isElementScanActive() && getShouldResumeAfterModalClose()) {
        setShouldResumeAfterModalClose(false);
        reselectElement();
      }
    });
  }
  var arrowDownIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>`;
  var CustomSelect = class {
        constructor(parentElement, options, initialValue) {
      this.parentElement = parentElement;
      this.options = options;
      this.currentValue = initialValue;
      this.isOpen = false;
      this.render();
      this.bindEvents();
    }
        render() {
      this.container = document.createElement("div");
      this.container.className = "custom-select-container";
      this.container.dataset.value = this.currentValue;
      this.trigger = document.createElement("div");
      this.trigger.className = "custom-select-trigger";
      this.selectedContent = document.createElement("div");
      this.selectedContent.className = "selected-option-content";
      const arrowDiv = document.createElement("div");
      arrowDiv.className = "custom-select-arrow";
      const arrowSVG = createSVGFromString(arrowDownIcon);
      if (arrowSVG) {
        arrowDiv.appendChild(arrowSVG);
      }
      this.trigger.appendChild(this.selectedContent);
      this.trigger.appendChild(arrowDiv);
      this.optionsContainer = document.createElement("div");
      this.optionsContainer.className = "custom-select-options";
      this.container.appendChild(this.trigger);
      this.container.appendChild(this.optionsContainer);
      this.parentElement.appendChild(this.container);
      let initialOption = this.options.find((opt) => opt.value === this.currentValue);
      if (!initialOption && this.options.length > 0) {
        console.warn(`CustomSelect: \u521D\u59CB\u503C "${this.currentValue}" \u5728\u9009\u9879\u4E2D\u672A\u627E\u5230\u3002\u5C06\u9ED8\u8BA4\u9009\u62E9\u7B2C\u4E00\u4E2A\u9009\u9879\u3002`);
        initialOption = this.options[0];
        this.currentValue = initialOption.value;
      }
      this.populateOptions();
      this.updateSelectedContent(initialOption);
    }
        populateOptions() {
      this.options.forEach((option) => {
        const optionEl = document.createElement("div");
        optionEl.className = "custom-select-option";
        optionEl.dataset.value = option.value;
        optionEl.setAttribute("role", "option");
        if (option.value === this.currentValue) {
          optionEl.classList.add("selected");
        }
        const optionContent = createIconTitle(option.icon, option.label);
        optionEl.appendChild(optionContent);
        this.optionsContainer.appendChild(optionEl);
      });
    }
        updateSelectedContent(option) {
      while (this.selectedContent.firstChild) {
        this.selectedContent.removeChild(this.selectedContent.firstChild);
      }
      const content = createIconTitle(option.icon, option.label);
      this.selectedContent.appendChild(content);
    }
        bindEvents() {
      this.trigger.addEventListener("click", () => this.toggle());
      this.optionsContainer.addEventListener("click", (e) => {
        const optionEl = e.target.closest(".custom-select-option");
        if (optionEl) {
          this.select(optionEl.dataset.value);
        }
      });
    }
        handleDocumentClick = (e) => {
      const path = e.composedPath();
      if (!path.includes(this.container)) {
        this.close();
      }
    };
        toggle() {
      this.isOpen = !this.isOpen;
      this.container.classList.toggle("open", this.isOpen);
      if (this.isOpen) {
        document.addEventListener("click", this.handleDocumentClick, true);
      } else {
        document.removeEventListener("click", this.handleDocumentClick, true);
      }
    }
        close() {
      if (this.isOpen) {
        this.isOpen = false;
        this.container.classList.remove("open");
        document.removeEventListener("click", this.handleDocumentClick, true);
      }
    }
        select(value) {
      if (value === this.currentValue) {
        this.close();
        return;
      }
      this.currentValue = value;
      this.container.dataset.value = value;
      const selectedOption = this.options.find((opt) => opt.value === value);
      this.updateSelectedContent(selectedOption);
      this.optionsContainer.querySelector(".custom-select-option.selected")?.classList.remove("selected");
      const newSelectedOptionEl = this.optionsContainer.querySelector(`[data-value="${value}"]`);
      if (newSelectedOptionEl) {
        newSelectedOptionEl.classList.add("selected");
      }
      this.close();
    }
        getValue() {
      return this.currentValue;
    }
        updateOptions(newOptions) {
      this.options = newOptions;
      while (this.optionsContainer.firstChild) {
        this.optionsContainer.removeChild(this.optionsContainer.firstChild);
      }
      this.populateOptions();
      const currentSelectedOption = this.options.find((opt) => opt.value === this.currentValue);
      if (currentSelectedOption) {
        this.updateSelectedContent(currentSelectedOption);
      }
    }
  };
  var systemThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;
  var lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;
  var darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;
  function createCheckbox(id, labelText, isChecked, tooltipConfig) {
    const label = document.createElement("label");
    label.className = "checkbox-group";
    label.htmlFor = id;
    label.appendChild(document.createTextNode(labelText));
    if (tooltipConfig && tooltipConfig.text) {
      const infoIconElement = document.createElement("span");
      infoIconElement.className = "info-icon";
      infoIconElement.appendChild(createSVGFromString(infoIcon));
      infoIconElement.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const translatedConfig = {
          ...tooltipConfig,
          title: t(tooltipConfig.title),
          text: t(tooltipConfig.text)
        };
        infoTooltip.show(translatedConfig);
      });
      label.appendChild(infoIconElement);
    }
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    if (isChecked) {
      input.checked = true;
    }
    const checkmark = document.createElement("span");
    checkmark.className = "checkmark";
    label.appendChild(input);
    label.appendChild(checkmark);
    return label;
  }
  function createNumericInput(id, labelText, value, options = {}) {
    const { min, max, disabled = false } = options;
    const container = document.createElement("div");
    container.className = "numeric-input-group";
    const label = document.createElement("label");
    label.className = "numeric-input-label";
    label.htmlFor = id;
    if (labelText) {
      label.textContent = labelText;
    }
    const input = document.createElement("input");
    input.type = "number";
    input.id = id;
    input.value = value;
    input.className = "numeric-input";
    if (typeof min !== "undefined") {
      input.min = min;
    }
    if (typeof max !== "undefined") {
      input.max = max;
    }
    if (disabled) {
      input.disabled = true;
    }
    container.appendChild(label);
    container.appendChild(input);
    return container;
  }
  function buildPanelDOM(settings) {
    const modal = document.createElement("div");
    modal.className = "settings-panel-modal";
    const header = document.createElement("div");
    header.className = "settings-panel-header";
    const titleContainer2 = document.createElement("div");
    titleContainer2.id = "settings-panel-title-container";
    const closeBtn = document.createElement("span");
    closeBtn.className = "tc-close-button settings-panel-close";
    closeBtn.appendChild(createSVGFromString(closeIcon));
    header.appendChild(titleContainer2);
    header.appendChild(closeBtn);
    const content = document.createElement("div");
    content.className = "settings-panel-content";
    selectSettingsDefinitions.forEach((definition) => {
      const selectItem = document.createElement("div");
      selectItem.className = "setting-item";
      const titleContainer3 = document.createElement("div");
      titleContainer3.id = `${definition.id}-title-container`;
      titleContainer3.className = "setting-title-container";
      const selectWrapper = document.createElement("div");
      selectWrapper.id = `${definition.id}-wrapper`;
      selectItem.appendChild(titleContainer3);
      selectItem.appendChild(selectWrapper);
      content.appendChild(selectItem);
    });
    const relatedItem = document.createElement("div");
    relatedItem.className = "setting-item";
    const relatedTitleContainer = document.createElement("div");
    relatedTitleContainer.id = "related-setting-title-container";
    relatedTitleContainer.className = "setting-title-container";
    relatedItem.appendChild(relatedTitleContainer);
    relatedSettingsDefinitions.forEach((setting) => {
      if (setting.linkedNumeric) {
        const compositeContainer = document.createElement("div");
        compositeContainer.className = "composite-setting-container";
        const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
        compositeContainer.appendChild(checkboxElement);
        const numericConfig = setting.linkedNumeric;
        const numericValue = settings[numericConfig.key];
        const numericLabel = t("settings.display.character_limit");
        const numericInputElement = createNumericInput(
          numericConfig.id,
          numericLabel,
          numericValue,
          {
            min: 5,
            disabled: !settings[setting.key]
          }
        );
        numericInputElement.classList.add("linked-numeric-input");
        compositeContainer.appendChild(numericInputElement);
        const checkbox = checkboxElement.querySelector('input[type="checkbox"]');
        const numericInput = numericInputElement.querySelector('input[type="number"]');
        checkbox.addEventListener("change", (event) => {
          numericInput.disabled = !event.target.checked;
        });
        relatedItem.appendChild(compositeContainer);
      } else if (setting.type === "select") {
        const selectContainer = document.createElement("div");
        selectContainer.className = "setting-item-select";
        const selectTitle = document.createElement("div");
        selectTitle.className = "setting-label";
        selectTitle.textContent = t(setting.label);
        const selectWrapper = document.createElement("div");
        selectWrapper.id = setting.id;
        new CustomSelect(selectWrapper, setting.options.map((opt) => ({ ...opt, label: t(opt.label) })), settings[setting.key]);
        selectContainer.appendChild(selectTitle);
        selectContainer.appendChild(selectWrapper);
        relatedItem.appendChild(selectContainer);
      } else {
        const checkboxElement = createCheckbox(setting.id, t(setting.label), settings[setting.key], setting.tooltip);
        relatedItem.appendChild(checkboxElement);
      }
    });
    const filterItem = document.createElement("div");
    filterItem.className = "setting-item";
    const filterTitleContainer = document.createElement("div");
    filterTitleContainer.id = "filter-setting-title-container";
    filterTitleContainer.className = "setting-title-container";
    filterItem.appendChild(filterTitleContainer);
    filterDefinitions.forEach((filter) => {
      const checkboxElement = createCheckbox(filter.id, t(filter.label), settings.filterRules[filter.key], filter.tooltip);
      filterItem.appendChild(checkboxElement);
    });
    content.appendChild(relatedItem);
    content.appendChild(filterItem);
    const footer = document.createElement("div");
    footer.className = "settings-panel-footer";
    const saveBtn = document.createElement("button");
    saveBtn.id = "save-settings-btn";
    saveBtn.className = "tc-button";
    footer.appendChild(saveBtn);
    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(footer);
    return modal;
  }
  var settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>`;
  var filterIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>`;
  var saveIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>`;
  var relatedSettingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-280h320v-400H320v400Zm80-80v-240h160v240H400Zm40-120h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;
  var settingsPanel = null;
  var selectComponents = {};
  var isTooltipVisible = false;
  var handleKeyDown2 = (event) => {
    if (isTooltipVisible) return;
    if (event.key === "Escape") {
      hideSettingsPanel();
    }
  };
  function showSettingsPanel(currentSettings, onSave) {
    log(t("log.settings.panel.opening"));
    if (settingsPanel) {
      setTimeout(() => settingsPanel.classList.add("is-visible"), 10);
      return;
    }
    settingsPanel = document.createElement("div");
    settingsPanel.className = "settings-panel-overlay";
    settingsPanel.tabIndex = -1;
    const panelModal = buildPanelDOM(currentSettings);
    settingsPanel.appendChild(panelModal);
    uiContainer.appendChild(settingsPanel);
    const titleContainer2 = settingsPanel.querySelector("#settings-panel-title-container");
    titleContainer2.appendChild(createIconTitle(settingsIcon, t("settings.title")));
    selectComponents = {};
    selectSettingsDefinitions.forEach((definition) => {
      const titleContainer3 = settingsPanel.querySelector(`#${definition.id}-title-container`);
      titleContainer3.appendChild(createIconTitle(definition.icon, t(definition.label)));
      const selectWrapper = settingsPanel.querySelector(`#${definition.id}-wrapper`);
      const options = definition.options.map((opt) => ({
        ...opt,
        label: t(opt.label),
        ...definition.key === "theme" && {
          "system": systemThemeIcon,
          "light": lightThemeIcon,
          "dark": darkThemeIcon
        }[opt.value]
      }));
      selectComponents[definition.key] = new CustomSelect(selectWrapper, options, currentSettings[definition.key]);
    });
    const relatedTitleContainer = settingsPanel.querySelector("#related-setting-title-container");
    relatedTitleContainer.appendChild(createIconTitle(relatedSettingsIcon, t("settings.relatedSettings")));
    const filterTitleContainer = settingsPanel.querySelector("#filter-setting-title-container");
    filterTitleContainer.appendChild(createIconTitle(filterIcon, t("settings.filterRules")));
    const saveBtn = settingsPanel.querySelector("#save-settings-btn");
    saveBtn.appendChild(createIconTitle(saveIcon, t("common.save")));
    settingsPanel.querySelector(".settings-panel-close").addEventListener("click", hideSettingsPanel);
    saveBtn.addEventListener("click", () => handleSave(onSave));
    settingsPanel.addEventListener("keydown", handleKeyDown2);
    on("infoTooltipWillShow", () => {
      isTooltipVisible = true;
    });
    on("infoTooltipDidHide", () => {
      isTooltipVisible = false;
    });
    settingsPanel.addEventListener("transitionend", () => {
      settingsPanel.focus();
    }, { once: true });
    setTimeout(() => {
      if (settingsPanel) settingsPanel.classList.add("is-visible");
    }, 10);
  }
  function hideSettingsPanel() {
    if (settingsPanel && settingsPanel.classList.contains("is-visible")) {
      log(t("log.settings.panel.closing"));
      settingsPanel.removeEventListener("keydown", handleKeyDown2);
      settingsPanel.classList.remove("is-visible");
      setTimeout(() => {
        if (settingsPanel) {
          settingsPanel.remove();
          settingsPanel = null;
          selectComponents = {};
        }
      }, 300);
    }
  }
  function handleSave(onSave) {
    log(t("log.settings.panel.saving"));
    const newSettings = {};
    for (const key in selectComponents) {
      newSettings[key] = selectComponents[key].getValue();
    }
    const newFilterRules = {};
    filterDefinitions.forEach((filter) => {
      const checkbox = settingsPanel.querySelector(`#${filter.id}`);
      if (checkbox) newFilterRules[filter.key] = checkbox.checked;
    });
    newSettings.filterRules = newFilterRules;
    relatedSettingsDefinitions.forEach((setting) => {
      if (setting.type === "select") {
        const selectContainer = settingsPanel.querySelector(`#${setting.id} .custom-select-container`);
        if (selectContainer) {
          newSettings[setting.key] = selectContainer.dataset.value;
        }
        return;
      }
      const checkbox = settingsPanel.querySelector(`#${setting.id}`);
      if (!checkbox) return;
      newSettings[setting.key] = checkbox.checked;
      if (setting.linkedNumeric) {
        const numericInput = settingsPanel.querySelector(`#${setting.linkedNumeric.id}`);
        if (numericInput) {
          let value = parseInt(numericInput.value, 10);
          if (isNaN(value) || value < 5) {
            value = 5;
            numericInput.value = value;
          }
          newSettings[setting.linkedNumeric.key] = value;
        }
      }
    });
    if (onSave) {
      onSave(newSettings);
    }
    hideSettingsPanel();
  }
  function initSettingsPanel(onOpen) {
    if (window.top === window.self) {
      (async () => {
        await updateSettingsMenu(onOpen);
      })();
      on("languageChanged", async () => {
        await updateSettingsMenu(onOpen);
      });
    }
  }
  function openSettingsPanel(settings, onSaveCallback) {
    showSettingsPanel(settings, onSaveCallback);
  }
  function handleOpenSettings() {
    const currentSettings = loadSettings();
    openSettingsPanel(currentSettings, (newSettings) => {
      const oldSettings = loadSettings();
      saveSettings(newSettings);
      applySettings(newSettings, oldSettings);
    });
  }
  function initialize() {
    initSettingsPanel(handleOpenSettings);
  }
  function getPageTitle() {
    return document.title.replace(/[\\/:*?"<>|]/g, "_");
  }
  function generateFilename(format) {
    const title = getPageTitle();
    const timestamp = ( new Date()).toLocaleString("sv").replace(/ /g, "_").replace(/:/g, "-");
    return `${title}_${timestamp}.${format}`;
  }
  function getRawContent(text) {
    return text;
  }
  function formatAsCsv(text) {
    const header = `"${t("export.csv.id")}","${t("export.csv.original")}","${t("export.csv.translation")}"
`;
    let csvContent = header;
    const regex = /\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*""\s*\]/g;
    try {
      const matches = text.matchAll(regex);
      let id = 1;
      for (const match of matches) {
        const originalText = match[1].replace(/\\"/g, '"').replace(/\\n/g, "\n");
        const escapedLine = `"${originalText.replace(/"/g, '""')}"`;
        csvContent += `${id},${escapedLine},""
`;
        id++;
      }
    } catch (error) {
      log(t("log.exporter.csvError"), error);
      return header;
    }
    return csvContent;
  }
  function downloadFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    log(t("log.exporter.fileExported", { filename }));
  }
  function exportToFile({ format }) {
    const currentMode2 = getCurrentMode();
    const processAndDownload = (text) => {
      if (!text || text.trim() === "" || text.trim() === "[]") {
        log(t("log.exporter.noContent"));
        return;
      }
      let filename, content, mimeType;
      switch (format) {
        case "txt":
          filename = generateFilename("txt");
          content = getRawContent(text);
          mimeType = "text/plain;charset=utf-8;";
          break;
        case "json":
          filename = generateFilename("json");
          content = getRawContent(text);
          mimeType = "application/json;charset=utf-8;";
          break;
        case "csv":
          filename = generateFilename("csv");
          content = formatAsCsv(text);
          mimeType = "text/csv;charset=utf-8;";
          break;
        default:
          log(t("log.exporter.unknownFormat", { format }));
          return;
      }
      downloadFile(filename, content, mimeType);
    };
    if (currentMode2 === "session-scan") {
      log(t("log.main.requestingSessionScanData"));
      requestSummary(processAndDownload);
    } else {
      log(t("log.main.exportingQuickScanData"));
      processAndDownload(fullQuickScanContent);
    }
  }
  function initializeExporter() {
    on("exportToFile", exportToFile);
  }
  function initialize2() {
    if (window.top !== window.self) {
      log(t("log.main.inIframe"));
      return;
    }
    const settings = loadSettings();
    initializeLanguage(settings);
    updateLoggerState(settings.enableDebugLogging);
    log(t("log.main.initializing"));
    log(t("log.main.initialSettingsLoaded"), settings);
    const styleElement = document.createElement("style");
    styleElement.textContent = `:host{
  --color-bg:#ffffff;
  --color-text:#333333;
  --color-text-secondary:#666666;
  --color-border:#e0e0e0;
  --color-overlay-bg:rgba(0,0,0,0.5);
  --color-shadow:rgba(0,0,0,0.2);
  --color-primary:#1a73e8;
  --color-primary-hover:#185abc;
  --color-primary-text:#ffffff;
  --color-toast-bg:#333333;
  --color-toast-text:#ffffff;
  --color-textarea-bg:#ffffff;
  --color-textarea-border:#cccccc;
  --color-tooltip-bg:#333333;
  --color-tooltip-text:#ffffff;
  --color-line-number-text:#888888;
  --color-line-number-active-text:#000000;
  --dark-color-bg:#2d2d2d;
  --dark-color-text:#f0f0f0;
  --dark-color-text-secondary:#aaaaaa;
  --dark-color-border:#555555;
  --dark-color-overlay-bg:rgba(0,0,0,0.7);
  --dark-color-shadow:rgba(0,0,0,0.4);
  --dark-color-primary:#1e90ff;
  --dark-color-primary-hover:#1c86ee;
  --dark-color-primary-text:#ffffff;
  --dark-color-toast-bg:#eeeeee;
  --dark-color-toast-text:#111111;
  --dark-color-textarea-bg:#3a3a3a;
  --dark-color-textarea-border:#666666;
  --dark-color-tooltip-bg:#e0e0e0;
  --dark-color-tooltip-text:#111111;
  --dark-color-line-number-text:#777777;
  --dark-color-line-number-active-text:#ffffff;
  --color-scrollbar-thumb:#c1c1c1;
  --color-scrollbar-thumb-hover:#a8a8a8;
  --color-scrollbar-border:#ffffff;
  --dark-color-scrollbar-thumb:#555555;
  --dark-color-scrollbar-thumb-hover:#777777;
  --dark-color-scrollbar-border:#2d2d2d;
}
:host([data-theme='light']){
  --main-bg:var(--color-bg);
  --main-text:var(--color-text);
  --main-text-secondary:var(--color-text-secondary);
  --tc-secondary-text-color:var(--color-text-secondary);
  --main-border:var(--color-border);
  --main-overlay-bg:var(--color-overlay-bg);
  --main-shadow:var(--color-shadow);
  --main-primary:var(--color-primary);
  --main-primary-hover:var(--color-primary-hover);
  --main-primary-text:var(--color-primary-text);
  --main-toast-bg:var(--color-toast-bg);
  --main-toast-text:var(--color-toast-text);
  --main-textarea-bg:var(--color-textarea-bg);
  --main-textarea-border:var(--color-textarea-border);
  --main-tooltip-bg:var(--color-tooltip-bg);
  --main-tooltip-text:var(--color-tooltip-text);
  --main-disabled:#cccccc;
  --main-disabled-text:#666666;
  --main-line-number-text:var(--color-line-number-text);
  --main-line-number-active-text:var(--color-line-number-active-text);
  --tc-scrollbar-thumb-color:var(--color-scrollbar-thumb);
  --tc-scrollbar-thumb-hover-color:var(--color-scrollbar-thumb-hover);
  --tc-scrollbar-border-color:var(--color-scrollbar-border);
  --main-bg-a:rgba(255, 255, 255, 0.6);
}
:host([data-theme='dark']){
  --main-bg:var(--dark-color-bg);
  --main-text:var(--dark-color-text);
  --main-text-secondary:var(--dark-color-text-secondary);
  --tc-secondary-text-color:var(--dark-color-text-secondary);
  --main-border:var(--dark-color-border);
  --main-overlay-bg:var(--dark-color-overlay-bg);
  --main-shadow:var(--dark-color-shadow);
  --main-primary:var(--dark-color-primary);
  --main-primary-hover:var(--dark-color-primary-hover);
  --main-primary-text:var(--dark-color-primary-text);
  --main-toast-bg:var(--dark-color-toast-bg);
  --main-toast-text:var(--dark-color-toast-text);
  --main-textarea-bg:var(--dark-color-textarea-bg);
  --main-textarea-border:var(--dark-color-textarea-border);
  --main-tooltip-bg:var(--dark-color-tooltip-bg);
  --main-tooltip-text:var(--dark-color-tooltip-text);
  --main-disabled:#444444;
  --main-disabled-text:#888888;
  --main-line-number-text:var(--dark-color-line-number-text);
  --main-line-number-active-text:var(--dark-color-line-number-active-text);
  --tc-scrollbar-thumb-color:var(--dark-color-scrollbar-thumb);
  --tc-scrollbar-thumb-hover-color:var(--dark-color-scrollbar-thumb-hover);
  --tc-scrollbar-border-color:var(--dark-color-scrollbar-border);
  --main-bg-a:rgba(45, 45, 45, 0.6);
}
.confirmation-modal-overlay{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:var(--main-overlay-bg);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:2147483647;
  opacity:0;
  visibility:hidden;
  transition:opacity 0.3s ease, visibility 0.3s ease;
}
.confirmation-modal-overlay.is-visible{
  opacity:1;
  visibility:visible;
}
.confirmation-modal-content{
  background-color:var(--main-bg);
  color:var(--main-text);
  padding:30px;
  border-radius:12px;
  text-align:center;
  width:320px;
  box-shadow:0 10px 30px var(--main-shadow);
  transform:scale(0.95);
  transition:transform 0.3s ease;
}
.confirmation-modal-overlay.is-visible .confirmation-modal-content{
    transform:scale(1);
}
.confirmation-modal-icon{
  margin-bottom:20px;
}
.confirmation-modal-icon svg{
  width:56px;
  height:56px;
  fill:var(--main-text);
}
.confirmation-modal-text{
  font-size:16px;
  margin:0 0 25px;
  line-height:1.6;
}
.confirmation-modal-buttons{
  display:flex;
  justify-content:center;
  gap:15px;
}
.confirmation-modal-button{
  border:none;
  padding:12px 24px;
  border-radius:9999px;
  font-size:14px;
  cursor:pointer;
  font-weight:bold;
  transition:background-color 0.2s ease, transform 0.2s ease;
}
.confirmation-modal-button:hover{
}
.confirmation-modal-button.confirm{
  background-color:var(--main-primary);
  color:var(--main-primary-text);
}
.confirmation-modal-button.confirm:hover{
  background-color:var(--main-primary-hover);
}
.confirmation-modal-button.cancel{
  background-color:transparent;
  color:var(--main-text);
  border:1px solid var(--main-border);
}
.confirmation-modal-button.cancel:hover{
  background-color:var(--main-shadow);
}
.custom-select-container{
  position:relative;
  width:100%;
  user-select:none;
}
.custom-select-trigger{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:4px 10px;
  border:1px solid var(--main-textarea-border);
  border-radius:12px;
  background-color:var(--main-textarea-bg);
  color:var(--main-text);
  font-size:15px;
  font-weight:500;
  cursor:pointer;
  transition:border-color 0.2s, box-shadow 0.2s;
}
.custom-select-trigger:hover{
  border-color:var(--main-primary);
  box-shadow:0 0 0 2px rgba(30, 144, 255, 0.1);
}
.custom-select-container.open .custom-select-trigger{
  border-color:var(--main-primary);
  box-shadow:0 0 0 2px rgba(30, 144, 255, 0.2);
}
.custom-select-arrow{
  display:flex;
  align-items:center;
  justify-content:center;
  transition:transform 0.3s ease;
  transform-origin:center;
}
.custom-select-container.open .custom-select-arrow{
  transform:rotate(180deg);
}
.custom-select-options{
  position:absolute;
  top:calc(100% + 4px);
  left:0;
  right:0;
  background-color:var(--main-bg);
  border:1px solid var(--main-border);
  border-radius:12px;
  box-shadow:0 4px 12px var(--main-shadow);
  z-index:10003;
  max-height:0;
  overflow:hidden;
  opacity:0;
  transition:max-height 0.2s ease-out, opacity 0.2s ease-out, visibility 0s 0.2s;
  visibility:hidden;
}
.custom-select-container.open .custom-select-options{
  visibility:visible;
  opacity:1;
  max-height:200px;
  transition:max-height 0.2s ease-out, opacity 0.2s ease-out;
}
.custom-select-option{
  display:flex;
  align-items:center;
  padding:8px 12px;
  cursor:pointer;
  transition:background-color 0.2s;
  gap:8px;
}
.custom-select-option:hover{
  background-color:var(--main-border);
}
.custom-select-option.selected{
  font-weight:600;
  color:var(--main-primary);
}
.custom-select-option .option-icon{
    display:flex;
    align-items:center;
}
.tc-dropdown-menu{
    position:absolute;
    bottom:calc(100% + 8px);
    right:51%;
    z-index:1050;
    background-color:var(--color-bg);
    border:1px solid var(--color-border);
    border-radius:16px;
    box-shadow:0 5px 15px var(--main-shadow);
    display:none;
    width:max-content;
    min-width:100%;
    overflow:hidden;
    animation:slide-up-fade-in 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
.tc-dropdown-menu.visible{
    display:block;
}
.tc-dropdown-menu button{
    display:flex;
    align-items:center;
    gap:12px;
    width:100%;
    padding:10px 16px;
    background-color:transparent;
    border:none;
    color:var(--main-text);
    text-align:left;
    cursor:pointer;
    font-size:14px;
    transition:background-color 0.2s ease;
}
.tc-dropdown-menu button:hover{
    background-color:#f0f0f0;
}
:host([data-theme='dark']) .tc-dropdown-menu{
    background-color:var(--dark-color-bg);
    border-color:var(--dark-color-border);
}
:host([data-theme='dark']) .tc-dropdown-menu button:hover{
    background-color:rgba(255, 255, 255, 0.1);
}
.tc-export-btn-container{
    position:relative;
}
@keyframes slide-up-fade-in{
    from{
        opacity:0;
        transform:translateY(10px) translateX(50%);
    }
    to{
        opacity:1;
        transform:translateY(0) translateX(50%);
    }
}
@keyframes slide-down-fade-out{
    from{
        opacity:1;
        transform:translateY(0) translateX(50%);
    }
    to{
        opacity:0;
        transform:translateY(10px) translateX(50%);
    }
}
.tc-dropdown-menu.is-hiding{
    animation:slide-down-fade-out 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}
.top-center-ui-container{
    position:fixed;
    top:20px;
    left:50%;
    transform:translate(-50%, -150%);
    opacity:0;
    display:flex;
    align-items:center;
    gap:10px;
    z-index:9999998;
    transition:transform 0.4s var(--easing-standard, cubic-bezier(0.4, 0, 0.2, 1)), opacity 0.4s var(--easing-standard, cubic-bezier(0.4, 0, 0.2, 1));
}
.top-center-ui-container.is-visible{
    transform:translate(-50%, 0);
    opacity:1;
}
.element-scan-help-icon{
    width:36px;
    height:36px;
    transition:transform 0.2s ease, background-color 0.2s ease;
}
.element-scan-help-icon:hover{
    transform:scale(1.1);
    background-color:var(--main-border);
}
.top-center-ui-container .tc-top-center-counter{
    position:relative;
    top:auto;
    left:auto;
    transform:none;
    opacity:1;
    transition:none;
}
#element-scan-container{
    position:absolute;
    z-index:9999998;
    pointer-events:none;
    transition:all 0.1s ease-in-out, opacity 0.2s ease-in-out, visibility 0s linear 0.2s;
    opacity:0;
    visibility:hidden;
}
#element-scan-highlight-border{
    width:100%;
    height:100%;
    border:4px solid #3498db;
    background-color:rgba(52, 152, 219, 0.2);
    border-radius:6px 6px 6px 0;
    box-sizing:border-box;
}
#element-scan-tag-name{
    position:absolute;
    top:100%;
    background-color:#3498db;
    color:white;
    padding:4px 8px;
    font-size:12px;
    border-radius:0 0 6px 6px;
    z-index:1;
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
    white-space:nowrap;
    transition:all 0.1s ease-in-out;
}
#element-scan-toolbar{
    position:fixed;
    z-index:10000000;
    background-color:var(--main-bg);
    border:1px solid var(--main-border);
    border-radius:16px;
    padding:10px;
    box-shadow:0 4px 12px rgba(0,0,0,0.15);
    cursor:move;
    display:flex;
    flex-direction:column;
    width:220px;
    opacity:0;
    visibility:hidden;
    transition:opacity 0.2s ease-in-out, visibility 0s linear 0.2s;
}
#element-scan-container.is-visible,
#element-scan-toolbar.is-visible{
    opacity:1;
    visibility:visible;
    transition-delay:0s;
}
#element-scan-toolbar-tag{
    font-weight:bold;
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
    text-align:center;
    color:var(--main-text);
    padding:5px;
    border-radius:4px;
    font-size:14px;
}
#element-scan-level-slider{
    width:100%;
}
#element-scan-toolbar-actions{
    display:flex;
    justify-content:space-between;
    gap:5px;
}
#element-scan-toolbar-actions button{
    flex-grow:1;
    padding:6px 8px;
    border:none;
    border-radius:12px;
    cursor:pointer;
    font-size:13px;
    color:var(--main-text);
    transition:background-color 0.2s;
}
.text-extractor-fab.is-recording{
    background-color:#f39c12;
    animation:tc-breathing 2s ease-in-out infinite;
}
.text-extractor-fab.is-recording:hover{
    background-color:#e67e22;
}
.fab-position-top-right{
    transform:translate(-30px, 30px);
}
.fab-position-bottom-right{
    transform:translate(-30px, calc(100vh - 260px - 30px));
}
.fab-position-top-left{
    transform:translate(calc(-100vw + 56px + 30px + var(--scrollbar-width)), 30px);
}
.fab-position-bottom-left{
    transform:translate(
        calc(-100vw + 56px + 30px + var(--scrollbar-width)),
        calc(100vh - 260px - 30px)
    );
}
.tc-button{
  font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
  padding:10px 20px;
  background-color:var(--main-primary);
  color:var(--main-primary-text);
  border:none;
  border-radius:999px;
  cursor:pointer;
  font-size:16px;
  font-weight:500;
  transition:background-color 0.2s, transform 0.15s, box-shadow 0.2s;
}
.tc-button:hover{
  background-color:var(--main-primary-hover);
  box-shadow:0 2px 8px rgba(0,0,0,0.15);
}
.tc-button:active{
  transform:scale(0.97);
}
.tc-button:disabled{
  background-color:var(--main-disabled);
  color:var(--main-disabled-text);
  cursor:not-allowed;
  box-shadow:none;
}
.tc-textarea{
  width:100%;
  height:100%;
  border:1px solid var(--main-textarea-border);
  background-color:var(--main-textarea-bg);
  color:var(--main-text);
  border-radius:8px;
  padding:12px;
  padding-right:18px;
  font-family:Menlo, Monaco,'Cascadia Code','PingFang SC';
  font-size:14px;
  resize:none;
  box-sizing:border-box;
  line-height:1.5;
}
.tc-textarea:focus{
  outline:none;
}
.tc-textarea::-webkit-scrollbar{
  width:6px;
}
.tc-textarea::-webkit-scrollbar-track{
  background:transparent;
}
.tc-textarea::-webkit-scrollbar-thumb{
  background-color:var(--main-border);
  border-radius:3px;
}
.tc-textarea::-webkit-scrollbar-thumb:hover{
  background-color:var(--main-primary);
}
.tc-textarea::-webkit-scrollbar-button{
  display:none;
}
.tc-select{
  display:block;
  width:100%;
  padding:10px 36px 10px 12px;
  border:1px solid var(--main-textarea-border);
  border-radius:8px;
  background-color:var(--main-textarea-bg);
  color:var(--main-text);
  font-size:14px;
  cursor:pointer;
  -webkit-appearance:none;
  -moz-appearance:none;
  appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath d='M8 11L2 5h12z'/%3E%3C/svg%3E");
  background-repeat:no-repeat;
  background-position:right 12px center;
  background-size:12px;
  transition:border-color 0.2s, box-shadow 0.2s;
}
.tc-select:hover{
  border-color:var(--main-primary);
  box-shadow:0 0 0 2px var(--main-primary-hover-bg, rgba(30, 144, 255, 0.1));
}
.info-tooltip-overlay{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background-color:var(--main-overlay-bg);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:10002;
    opacity:0;
    visibility:hidden;
    transition:opacity 0.3s ease, visibility 0.3s;
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
}
.info-tooltip-overlay.is-visible{
    opacity:1;
    visibility:visible;
}
.info-tooltip-modal{
    background-color:var(--main-bg);
    color:var(--main-text);
    border:1px solid var(--main-border);
    border-radius:16px;
    box-shadow:0 5px 15px var(--main-shadow);
    padding:0;
    position:relative;
    width:400px;
    max-width:90vw;
    max-height:90vh;
    display:flex;
    flex-direction:column;
    transform:scale(0.95);
    transition:transform 0.3s ease;
    overflow:hidden;
}
.info-tooltip-overlay.is-visible .info-tooltip-modal{
    transform:scale(1);
}
.info-tooltip-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px;
    border-bottom:1px solid var(--main-border);
}
.info-tooltip-title-container{
    display:flex;
    align-items:center;
    gap:10px;
}
.info-tooltip-title-icon{
    width:20px;
    height:20px;
    color:var(--secondary-text);
}
.info-tooltip-title{
    font-size:18px;
    font-weight:bold;
    margin:0;
}
.info-tooltip-close{
    display:flex;
    align-items:center;
    justify-content:center;
    width:32px;
    height:32px;
    border-radius:50%;
    cursor:pointer;
    color:var(--main-text);
    background-color:transparent;
    transition:background-color 0.2s, transform 0.15s;
}
.info-tooltip-close:hover{
    background-color:var(--main-border);
}
.info-tooltip-close:active{
    transform:scale(0.9);
}
.info-tooltip-close svg{
    width:18px;
    height:18px;
}
.info-tooltip-content{
    padding:20px;
    overflow-y:auto;
}
.info-tooltip-content p{
    margin:0 0 15px 0;
    line-height:1.7;
    font-size:16px;
}
.info-tooltip-content p:last-child{
    margin-bottom:0;
}
.info-tooltip-content strong{
    color:var(--primary-accent);
    font-weight:600;
}
.info-tooltip-image{
    max-width:100%;
    height:auto;
    border-radius:8px;
    margin-top:10px;
    display:block;
    margin-left:auto;
    margin-right:auto;
    opacity:0;
    animation:fadeIn 0.3s forwards;
}
@keyframes fadeIn{
    to{
        opacity:1;
    }
}
.info-icon{
    margin-left:8px;
    cursor:pointer;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    vertical-align:text-bottom;
    color:var(--secondary-text);
    width:20px;
    height:20px;
    border-radius:50%;
    transition:background-color 0.2s, color 0.2s;
}
.info-icon:hover{
    color:var(--primary-accent);
    background-color:var(--main-border);
}
.info-icon svg{
    width:16px;
    height:16px;
}
.gm-loading-overlay{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(128, 128, 128, 0.2);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:10;
  opacity:0;
  visibility:hidden;
  transition:opacity 0.2s, visibility 0.2s;
}
.gm-loading-overlay.is-visible{
  opacity:1;
  visibility:visible;
}
.gm-loading-spinner svg{
  width:48px;
  height:48px;
  color:var(--color-icon);
}
.text-extractor-fab-container{
    position:fixed;
    top:0;
    right:0;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:12px;
    z-index:9999;
    opacity:0;
    visibility:hidden;
    transition:opacity 0.3s ease, visibility 0.3s, transform 0.3s ease-in-out;
    transform-origin:top right;
}
.text-extractor-fab-container.fab-container-visible{
    opacity:1;
    visibility:visible;
}
.text-extractor-fab{
    position:relative;
    width:56px;
    height:56px;
    background-color:var(--main-primary);
    border-radius:50%;
    box-shadow:0 4px 8px var(--main-shadow);
    cursor:pointer;
    transition:background-color 0.3s, transform 0.2s, box-shadow 0.3s, color 0.3s;
    color:var(--main-primary-text);
    border:1px solid var(--main-border);
}
.text-extractor-fab:hover{
    background-color:var(--main-primary-hover);
    transform:scale(1.05);
    box-shadow:0 6px 12px var(--main-shadow);
}
.text-extractor-fab:active{
    transform:scale(0.95);
    transition-duration:0.1s;
}
.text-extractor-fab svg{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:26px;
    height:26px;
    fill:currentColor;
}
.text-extractor-modal-overlay{
  position:fixed; top:0; left:0; width:100%; height:100%;
  background-color:var(--main-overlay-bg);
  z-index:10000;
  display:flex;
  justify-content:center;
  align-items:center;
  opacity:0;
  visibility:hidden;
  transition:opacity 0.3s ease, visibility 0.3s;
  pointer-events:none;
}
.text-extractor-modal-overlay.is-visible{
  opacity:1;
  visibility:visible;
  pointer-events:auto;
}
.text-extractor-modal{
  background-color:var(--main-bg);
  color:var(--main-text);
  width:80%; max-width:700px; max-height:80vh;
  border-radius:16px;
  box-shadow:0 5px 15px var(--main-shadow);
  display:flex;
  flex-direction:column;
  transform:scale(0.95);
  transition:transform 0.3s ease;
}
.text-extractor-modal-overlay.is-visible .text-extractor-modal{
    transform:scale(1);
}
.text-extractor-modal-header{
  padding:18px;
  border-bottom:1px solid var(--main-border);
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:18px;
  font-weight:bold;
  color:var(--main-text);
}
.tc-close-button{
  display:flex;
  align-items:center;
  justify-content:center;
  width:32px;
  height:32px;
  border-radius:50%;
  cursor:pointer;
  color:var(--main-text);
  background-color:transparent;
  transition:background-color 0.2s, transform 0.15s;
}
.tc-close-button:hover{
  background-color:var(--main-border);
}
.tc-close-button:active{
  transform:scale(0.9);
  background-color:var(--main-border);
}
.text-extractor-modal-content{
  padding:18px;
  overflow-y:auto;
  flex-grow:1;
  display:flex;
  position:relative;
}
.tc-textarea-container{
    opacity:0;
    visibility:hidden;
    transition:opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    width:100%;
    height:100%;
    display:flex;
    box-sizing:border-box;
}
.tc-textarea-container.is-visible{
    opacity:1;
    visibility:visible;
}
.text-extractor-modal-footer{
  padding:18px;
  border-top:1px solid var(--main-border);
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.tc-footer-buttons{
    display:flex;
    align-items:center;
    gap:10px;
}
@keyframes tc-breathing{
    0%{
        box-shadow:0 4px 8px var(--main-shadow), 0 0 0 0 rgba(243, 156, 18, 0.4);
    }
    70%{
        box-shadow:0 4px 12px var(--main-shadow), 0 0 0 10px rgba(243, 156, 18, 0);
    }
    100%{
        box-shadow:0 4px 8px var(--main-shadow), 0 0 0 0 rgba(243, 156, 18, 0);
    }
}
#scan-count-display{
    font-size:14px;
    font-family:Menlo, Monaco,'Cascadia Code','PingFang SC';
    color:var(--tc-secondary-text-color);
    margin-left:6px;
    opacity:0;
    transition:opacity 0.3s ease-in-out;
    display:flex;
    align-items:center;
}
.header-right-controls{
    display:flex;
    align-items:center;
}
#scan-count-display.is-visible{
    opacity:1;
}
.text-extractor-fab-container.fab-container-visible .text-extractor-fab.fab-disabled{
    background-color:var(--main-disabled);
    color:var(--main-disabled-text);
    cursor:not-allowed;
    box-shadow:none;
    transform:none;
}
.tc-help-icon-button{
    background-color:var(--main-bg-a);
    border:1px solid var(--main-border);
    border-radius:50%;
    width:32px;
    height:32px;
    padding:0;
    cursor:pointer;
    color:var(--main-text-secondary);
    transition:color 0.2s, transform 0.2s, background-color 0.2s;
    display:flex;
    align-items:center;
    justify-content:center;
    box-shadow:var(--main-shadow);
    backdrop-filter:blur(16px);
    -webkit-backdrop-filter:blur(16px);
}
.tc-help-icon-button:hover{
    color:var(--main-text);
    background-color:var(--main-border);
}
.tc-help-icon-button svg{
    width:20px;
    height:20px;
}
.tc-textarea-container{
    display:flex;
    flex-grow:1;
    position:relative;
    overflow:hidden;
    border:1px solid var(--main-textarea-border);
    border-radius:8px;
}
.tc-line-numbers{
    width:40px;
    padding:10px 0;
    text-align:right;
    max-width:0;
    opacity:0;
    margin-right:0;
    transition:max-width 0.3s ease, opacity 0.3s ease, padding 0.3s ease, margin-right 0.3s ease;
    color:var(--main-line-number-text);
    background-color:var(--tc-secondary-bg-color);
    overflow:hidden;
    user-select:none;
    font-family:Menlo, Monaco,'Cascadia Code','PingFang SC';
    font-size:14px;
    line-height:1.5;
    border-right:1px solid var(--tc-border-color);
    box-sizing:border-box;
    padding-bottom:8px;
}
.tc-line-numbers > div{
    white-space:nowrap;
    padding:0 4px;
    box-sizing:border-box;
    transition:color 0.2s ease-in-out;
}
.tc-line-numbers > div.is-active{
    font-weight:bold;
    color:var(--main-line-number-active-text);
}
.tc-textarea-container .tc-textarea{
    border:none;
    border-radius:0;
    flex-grow:1;
    resize:none;
    line-height:1.5;
    font-size:14px;
    padding:10px;
    box-sizing:border-box;
    padding-bottom:8px;
    scrollbar-gutter:stable;
}
.tc-textarea-container .tc-textarea:focus{
    outline:none;
    box-shadow:none;
}
.tc-textarea.word-wrap-disabled{
    white-space:pre;
    overflow-x:auto;
}
.tc-line-numbers.is-visible{
    max-width:40px;
    opacity:1;
    padding:10px 4px;
    margin-right:4px;
}
.tc-stats-container{
    font-size:14px;
    font-family:Menlo, Monaco,'Cascadia Code','PingFang SC';
    color:var(--tc-secondary-text-color);
    display:flex;
    align-items:center;
    flex-grow:1;
    opacity:0;
    visibility:hidden;
    transition:opacity 0.3s ease, visibility 0.3s ease;
}
.tc-stats-container.is-visible{
    opacity:1;
    visibility:visible;
}
.tc-textarea::-webkit-scrollbar{
    width:6px;
    height:6px;
}
.tc-textarea::-webkit-scrollbar-track{
    background:transparent;
}
.tc-textarea::-webkit-scrollbar-thumb{
    background:var(--tc-scrollbar-thumb-color);
    border-radius:3px;
    border:1px solid var(--tc-scrollbar-border-color);
}
.tc-textarea::-webkit-scrollbar-thumb:hover{
    background:var(--tc-scrollbar-thumb-hover-color);
}
@keyframes line-number-enter{
    from{
        opacity:0;
        transform:translateY(5px);
    }
    to{
        opacity:1;
        transform:translateY(0);
    }
}
.line-number-enter-active{
    animation:line-number-enter 0.2s ease-out;
}
.tc-notification-container{
    position:fixed;
    top:20px;
    right:20px;
    z-index:2147483647;
    display:flex;
    flex-direction:column;
    gap:10px;
}
.tc-notification{
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
    display:flex;
    align-items:center;
    padding:12px 16px;
    border-radius:16px;
    background-color:var(--main-bg, #fff);
    color:var(--main-text, #333);
    box-shadow:0 4px 12px var(--main-shadow, rgba(0, 0, 0, 0.15));
    border:1px solid var(--main-border, #eee);
    width:320px;
    opacity:0;
    transform:translateX(100%);
    animation:tc-notification-fade-in 0.5s forwards;
    transition:box-shadow 0.3s;
}
.tc-notification:hover{
    box-shadow:0 6px 16px var(--main-shadow, rgba(0, 0, 0, 0.2));
}
.tc-notification-icon{
    margin-right:12px;
    display:flex;
    align-items:center;
}
.tc-notification-icon svg{
    width:20px;
    height:20px;
}
.tc-notification-info .tc-notification-icon{
    color:#3498db;
}
.tc-notification-success .tc-notification-icon{
    color:#2ecc71;
}
.tc-notification-content{
    flex-grow:1;
    font-size:14px;
    line-height:1.4;
}
.tc-notification-close{
    cursor:pointer;
    opacity:0.6;
    transition:opacity 0.3s;
    padding:4px;
}
.tc-notification-close:hover{
    opacity:1;
}
.tc-notification-close svg{
    width:16px;
    height:16px;
    stroke:var(--main-text, #333);
}
@keyframes tc-notification-fade-in{
    to{
        opacity:1;
        transform:translateX(0);
    }
}
.tc-notification-fade-out{
    animation:tc-notification-fade-out 0.5s forwards;
}
@keyframes tc-notification-fade-out{
    from{
        opacity:1;
        transform:translateX(0);
    }
    to{
        opacity:0;
        transform:translateX(100%);
    }
}
#modal-placeholder{
    display:flex;
    opacity:0;
    visibility:hidden;
    transition:opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    color:var(--text-color-secondary);
    padding:20px;
    box-sizing:border-box;
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
}
#modal-placeholder.is-visible{
    opacity:1;
    visibility:visible;
}
.placeholder-icon{
    color:var(--text-color-secondary);
}
.placeholder-icon svg{
    width:48px;
    height:48px;
}
#modal-placeholder p{
    margin:4px 0;
    font-size:14px;
}
.placeholder-actions{
    display:flex;
    align-items:center;
    gap:6px;
    color:var(--text-color-primary);
}
.placeholder-action-icon svg{
    width:18px;
    height:18px;
    fill:currentColor;
    vertical-align:middle;
}
#modal-placeholder strong{
    font-weight:600;
}
.settings-panel-overlay{
  position:fixed; top:0; left:0; width:100%; height:100%;
  background-color:var(--main-overlay-bg);
  z-index:10002;
  display:flex;
  justify-content:center;
  align-items:center;
  opacity:0;
  visibility:hidden;
  transition:opacity 0.3s ease, visibility 0.3s;
}
.settings-panel-overlay.is-visible{
    opacity:1;
    visibility:visible;
}
.settings-panel-modal{
  font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
  background-color:var(--main-bg);
  color:var(--main-text);
  border:1px solid var(--main-border);
  border-radius:16px;
  box-shadow:0 5px 15px var(--main-shadow);
  width:90%;
  max-width:400px;
  max-height:85vh;
  display:flex;
  flex-direction:column;
  transform:scale(0.95);
  transition:transform 0.3s ease;
}
.settings-panel-overlay.is-visible .settings-panel-modal{
    transform:scale(1);
}
.settings-panel-header, .settings-panel-content, .settings-panel-footer{
  padding:20px;
}
.settings-panel-content{
    padding-right:18px;
    overflow-y:auto;
    flex-grow:1;
}
.settings-panel-header{
  display:flex; justify-content:space-between; align-items:center;
  border-bottom:1px solid var(--main-border);
  font-weight:bold;
  font-size:18px;
}
.setting-item{ margin-bottom:16px; }
.setting-item > label{ display:block; margin-bottom:8px; font-weight:500; }
.setting-title-container{
  font-weight:bold;
  font-size:16px;
  margin-bottom:8px;
}
.checkbox-group{
  display:block;
  position:relative;
  padding-left:30px;
  margin-top:12px;
  margin-left:2px;
  cursor:pointer;
  user-select:none;
  height:20px;
  line-height:20px;
  color:var(--main-text);
}
.checkbox-group input{
  position:absolute;
  opacity:0;
  cursor:pointer;
  height:0;
  width:0;
}
.checkmark{
  position:absolute;
  top:0;
  left:0;
  height:18px;
  width:18px;
  background-color:var(--main-textarea-bg);
  border:1px solid var(--main-textarea-border);
  border-radius:3px;
  transition:all 0.2s;
}
.checkbox-group:hover input ~ .checkmark{
  border-color:var(--main-primary);
}
.checkbox-group input:checked ~ .checkmark{
  background-color:var(--main-primary);
  border-color:var(--main-primary);
}
.checkmark:after{
  content:"";
  position:absolute;
  display:none;
}
.checkbox-group input:checked ~ .checkmark:after{
  display:block;
}
.checkbox-group .checkmark:after{
  left:6px;
  top:2px;
  width:5px;
  height:10px;
  border:solid var(--main-bg);
  border-width:0 2px 2px 0;
  transform:rotate(45deg);
}
.settings-panel-footer{
  border-top:1px solid var(--main-border);
  text-align:right;
}
.settings-panel-content::-webkit-scrollbar{
  width:6px;
}
.settings-panel-content::-webkit-scrollbar-track{
  background:transparent;
}
.settings-panel-content::-webkit-scrollbar-thumb{
  background-color:var(--main-border);
  border-radius:3px;
}
.settings-panel-content::-webkit-scrollbar-thumb:hover{
  background-color:var(--main-primary);
}
.settings-panel-content::-webkit-scrollbar-button{
  display:none;
}
.composite-setting-container{
    font-weight:500;
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
    margin-top:14px;
    margin-left:0px;
}
.composite-setting-container .checkbox-group{
    margin-top:0;
}
.linked-numeric-input{
    margin-top:8px;
    margin-left:32px;
}
.numeric-input-group{
    display:flex;
    align-items:center;
    gap:8px;
}
.numeric-input{
    width:100px;
    padding:6px 8px;
    border-radius:8px;
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
    border:1px solid var(--main-textarea-border);
    background-color:var(--main-textarea-bg);
    color:var(--main-text);
    font-size:14px;
    transition:border-color 0.2s, box-shadow 0.2s, background-color 0.2s, color 0.2s;
}
.numeric-input:focus{
    outline:none;
    border-color:var(--main-primary);
    box-shadow:0 0 0 2px color-mix(in srgb, var(--main-primary) 20%, transparent);
}
.numeric-input:disabled{
    background-color:var(--main-disabled);
    color:var(--main-disabled-text);
    cursor:not-allowed;
    border-color:var(--main-border);
}
.setting-item-select{
    font-weight:500;
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-left:32px;
}
.text-extractor-tooltip{
    position:fixed;
    z-index:10001;
    background-color:var(--main-tooltip-bg);
    color:var(--main-tooltip-text);
    padding:8px 12px;
    border-radius:16px;
    border:1px solid var(--main-border);
    font-size:14px;
    font-weight:bold;
    pointer-events:none;
    opacity:0;
    visibility:hidden;
    transition:opacity 0.2s ease, visibility 0.2s;
    box-shadow:0 2px 5px var(--main-shadow);
    white-space:nowrap;
}
.text-extractor-tooltip.is-visible{
    opacity:1;
    visibility:visible;
}
.tc-top-center-counter{
    position:fixed;
    top:20px;
    left:50%;
    font-family:'Menlo', 'Monaco', 'Cascadia Code', 'PingFang SC';
    transform:translate(-50%, -150%);
    background-color:var(--main-bg-a);
    color:var(--main-text);
    padding:8px 16px;
    border-radius:20px;
    font-size:14px;
    font-weight:500;
    box-shadow:var(--main-shadow);
    backdrop-filter:blur(16px);
    -webkit-backdrop-filter:blur(16px);
    z-index:9999999;
    opacity:0;
    transition:transform 0.4s var(--easing-standard, cubic-bezier(0.4, 0, 0.2, 1)), opacity 0.4s var(--easing-standard, cubic-bezier(0.4, 0, 0.2, 1)), width 0.3s ease-in-out;
    display:flex;
    align-items:center;
    gap:8px;
    border:1px solid var(--main-border);
}
.tc-top-center-counter.is-visible{
    transform:translate(-50%, 0);
    opacity:1;
}
.tc-top-center-counter span{
    font-weight:bold;
    font-size:16px;
    color:var(--main-primary);
}
`;
    uiContainer.appendChild(styleElement);
    initTheme();
    initialize();
    initUI();
    initializeExporter();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize2);
  } else {
    initialize2();
  }
  return __toCommonJS(main_exports);
})();