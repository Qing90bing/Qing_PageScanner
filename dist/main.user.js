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
// ==/UserScript==



// --- CSS 注入 ---
(function() {
    'use strict';
    const css = `
/* src/assets/themes.css */
/* 这个文件只定义颜色变量和主题切换逻辑 */

:root {
  /* 浅色模式颜色变量 */
  --color-bg: #ffffff;
  --color-text: #333333;
  --color-border: #e0e0e0;
  --color-overlay-bg: rgba(0,0,0,0.5);
  --color-shadow: rgba(0,0,0,0.2);
  --color-primary: #1a73e8;
  --color-primary-hover: #185abc;
  --color-primary-text: #ffffff;
  --color-toast-bg: #333333;
  --color-toast-text: #ffffff;
  --color-textarea-bg: #ffffff;
  --color-textarea-border: #cccccc;

  /* 深色模式颜色变量 */
  --dark-color-bg: #2d2d2d;
  --dark-color-text: #f0f0f0;
  --dark-color-border: #555555;
  --dark-color-overlay-bg: rgba(0,0,0,0.7);
  --dark-color-shadow: rgba(0,0,0,0.4);
  --dark-color-primary: #1e90ff;
  --dark-color-primary-hover: #1c86ee;
  --dark-color-primary-text: #ffffff;
  --dark-color-toast-bg: #eeeeee;
  --dark-color-toast-text: #111111;
  --dark-color-textarea-bg: #3a3a3a;
  --dark-color-textarea-border: #666666;
}

/* 根据 data-theme 属性应用浅色主题 */
body[data-theme='light'] {
  --main-bg: var(--color-bg);
  --main-text: var(--color-text);
  --main-border: var(--color-border);
  --main-overlay-bg: var(--color-overlay-bg);
  --main-shadow: var(--color-shadow);
  --main-primary: var(--color-primary);
  --main-primary-hover: var(--color-primary-hover);
  --main-primary-text: var(--color-primary-text);
  --main-toast-bg: var(--color-toast-bg);
  --main-toast-text: var(--color-toast-text);
  --main-textarea-bg: var(--color-textarea-bg);
  --main-textarea-border: var(--color-textarea-border);
  --main-disabled: #cccccc;
  --main-disabled-text: #666666;
}

/* 根据 data-theme 属性应用深色主题 */
body[data-theme='dark'] {
  --main-bg: var(--dark-color-bg);
  --main-text: var(--dark-color-text);
  --main-border: var(--dark-color-border);
  --main-overlay-bg: var(--dark-color-overlay-bg);
  --main-shadow: var(--dark-color-shadow);
  --main-primary: var(--dark-color-primary);
  --main-primary-hover: var(--dark-color-primary-hover);
  --main-primary-text: var(--dark-color-primary-text);
  --main-toast-bg: var(--dark-color-toast-bg);
  --main-toast-text: var(--dark-color-toast-text);
  --main-textarea-bg: var(--dark-color-textarea-bg);
  --main-textarea-border: var(--dark-color-textarea-border);
  --main-disabled: #444444;
  --main-disabled-text: #888888;
}


/* --- From custom-select.css --- */
/* src/assets/styles/custom-select.css */

.custom-select-container {
  position: relative;
  width: 100%;
  user-select: none;
}

.custom-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid var(--main-textarea-border);
  border-radius: 8px;
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.custom-select-trigger:hover {
  border-color: var(--main-primary);
  box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.1);
}

.custom-select-container.open .custom-select-trigger {
  border-color: var(--main-primary);
  box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.2);
}

.custom-select-arrow {
  transition: transform 0.3s ease;
}

.custom-select-container.open .custom-select-arrow {
  transform: rotate(180deg);
}

.custom-select-options {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background-color: var(--main-bg);
  border: 1px solid var(--main-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px var(--main-shadow);
  z-index: 10003; /* 比设置面板高一级 */
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: max-height 0.3s ease-out, opacity 0.2s ease-out;
  visibility: hidden;
}

.custom-select-container.open .custom-select-options {
  visibility: visible;
  opacity: 1;
  max-height: 200px; /* 或者一个足够大的值 */
}

.custom-select-option {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 8px;
}

.custom-select-option:hover {
  background-color: var(--main-border);
}

.custom-select-option.selected {
  font-weight: 600;
  color: var(--main-primary);
}

.custom-select-option .option-icon {
    display: flex;
    align-items: center;
}

/* --- From forms.css --- */
/* src/assets/styles/forms.css */

/* --- 可复用的按钮样式 --- */
.tc-button {
  padding: 10px 20px;
  background-color: var(--main-primary);
  color: var(--main-primary-text);
  border: none;
  border-radius: 999px; /* 完全圆角，胶囊形状 */
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.15s, box-shadow 0.2s;
}
.tc-button:hover {
  background-color: var(--main-primary-hover);
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.tc-button:active {
  transform: scale(0.97);
}
.tc-button:disabled {
  background-color: var(--main-disabled);
  color: var(--main-disabled-text);
  cursor: not-allowed;
  box-shadow: none;
}

/* --- 可复用的文本框样式 --- */
.tc-textarea {
  width: 100%;
  height: 100%; /* 修改：填满父容器 */
  border: 1px solid var(--main-textarea-border);
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  border-radius: 8px;
  padding: 12px;
  padding-right: 18px; /* 为滚动条轨道留出空间 */
  font-family: Menlo, Monaco, 'Courier New', monospace, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei';
  font-size: 14px;
  resize: none; /* 禁用拖拽调整大小 */
  box-sizing: border-box;
}

/* 自定义滚动条样式 */
.tc-textarea::-webkit-scrollbar {
  width: 6px; /* 更细的滚动条 */
}
.tc-textarea::-webkit-scrollbar-track {
  background: transparent; /* 轨道透明 */
}
.tc-textarea::-webkit-scrollbar-thumb {
  background-color: var(--main-border);
  border-radius: 3px;
}
.tc-textarea::-webkit-scrollbar-thumb:hover {
  background-color: var(--main-primary);
}
.tc-textarea::-webkit-scrollbar-button {
  display: none; /* 隐藏上下两端的箭头按钮 */
}

/* --- 可复用的下拉菜单样式 --- */
.tc-select {
  /* Box model and appearance */
  display: block;
  width: 100%;
  padding: 10px 36px 10px 12px; /* 右侧留出更多空间给箭头 */
  border: 1px solid var(--main-textarea-border);
  border-radius: 8px;
  background-color: var(--main-textarea-bg);
  color: var(--main-text);
  font-size: 14px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* Custom arrow icon */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='currentColor'%3E%3Cpath d='M8 11L2 5h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px; /* 稍微增大箭头尺寸 */

  /* Transitions */
  transition: border-color 0.2s, box-shadow 0.2s;
}
.tc-select:hover {
  border-color: var(--main-primary);
  box-shadow: 0 0 0 2px var(--main-primary-hover-bg, rgba(30, 144, 255, 0.1));
}

/* --- From live-counter.css --- */
/* src/assets/styles/live-counter.css */

.tc-live-counter {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translate(-50%, -150%); /* 初始位置在屏幕外上方 */
    z-index: 2147483646; /* 比通知低一级 */
    display: flex; /* 保持flex布局 */
    align-items: center;
    padding: 8px 16px;
    border-radius: 20px; /* 圆角 */
    background-color: rgba(0, 0, 0, 0.7); /* 半透明背景 */
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 2px 8px var(--main-shadow, rgba(0, 0, 0, 0.2));
    border: 1px solid var(--main-border, rgba(255, 255, 255, 0.2));
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    opacity: 0; /* 默认不可见 */
    pointer-events: none; /* 默认不可交互 */
}

.tc-live-counter.tc-live-counter-visible {
    transform: translate(-50%, 0); /* 动画结束位置 */
    opacity: 1; /* 变得可见 */
    pointer-events: auto; /* 变得可交互 */
}

.tc-live-counter span {
    min-width: 20px;
    text-align: center;
    margin-left: 8px;
    padding: 2px 6px;
    background-color: var(--main-overlay-bg, rgba(255, 255, 255, 0.2));
    border-radius: 10px;
}

/* --- From main-ui.css --- */
/* src/assets/styles/main-ui.css */

/* --- 悬浮操作按钮容器 --- */
.text-extractor-fab-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    display: flex;
    flex-direction: column; /* 垂直排列 */
    align-items: center;
    gap: 12px; /* 按钮之间的间距 */
    z-index: 9999;
    opacity: 0; /* 初始透明 */
    transition: opacity 0.5s ease-out;
}

.text-extractor-fab-container.fab-container-visible {
    opacity: 1; /* 最终不透明 */
}

/* --- 单个悬浮操作按钮 (FAB) --- */
.text-extractor-fab {
    position: relative; /* 为SVG定位提供基准 */
    width: 56px;
    height: 56px;
    background-color: var(--main-primary);
    border-radius: 50%;
    box-shadow: 0 4px 8px var(--main-shadow);
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
    color: var(--main-primary-text); /* SVG 图标将继承这个颜色 */
    border: 1px solid var(--main-border); /* 添加描边 */
}

.text-extractor-fab:hover {
    background-color: var(--main-primary-hover);
    transform: scale(1.05);
    box-shadow: 0 6px 12px var(--main-shadow);
}

.text-extractor-fab:active {
    transform: scale(0.95); /* 点击时缩小 */
    transition-duration: 0.1s;
}

.text-extractor-fab svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26px;
    height: 26px;
    fill: currentColor; /* 关键：让 SVG 的 fill 颜色继承自父元素的 color 属性 */
}

/* --- 文本提取模态框 --- */
.text-extractor-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  /* --- 新增：动画相关属性 --- */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
}

/* 新增：可见状态 */
.text-extractor-modal-overlay.is-visible {
  opacity: 1;
  visibility: visible;
}

.text-extractor-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  width: 80%; max-width: 700px; max-height: 80vh;
  border-radius: 16px; /* 增大了圆角 */
  box-shadow: 0 5px 15px var(--main-shadow);
  display: flex;
  flex-direction: column;
  /* --- 新增：动画相关属性 --- */
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

/* 新增：可见状态下的模态框样式 */
.text-extractor-modal-overlay.is-visible .text-extractor-modal {
    transform: scale(1);
}

.text-extractor-modal-header {
  padding: 16px;
  border-bottom: 1px solid var(--main-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: var(--main-text);
}

/* --- 可复用的关闭按钮 --- */
.tc-close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  color: var(--main-text);
  background-color: transparent;
  transition: background-color 0.2s, transform 0.15s;
}

.tc-close-button:hover {
  background-color: var(--main-border);
}

.tc-close-button:active {
  transform: scale(0.9);
  background-color: var(--main-border);
}

.text-extractor-modal-content {
  padding: 16px;
  overflow-y: auto;
  flex-grow: 1;
  display: flex; /* 新增：启用flexbox布局 */
}

.text-extractor-modal-footer {
  padding: 16px;
  border-top: 1px solid var(--main-border);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* --- 动态扫描按钮的激活状态 --- */
.text-extractor-fab.fab-dynamic.is-recording {
    background-color: #f39c12; /* 橙色 */
    animation: tc-breathing 2s ease-in-out infinite;
}

.text-extractor-fab.fab-dynamic.is-recording:hover {
    background-color: #e67e22; /* 深一点的橙色 */
}

@keyframes tc-breathing {
    0% {
        box-shadow: 0 4px 8px var(--main-shadow), 0 0 0 0 rgba(243, 156, 18, 0.4);
    }
    70% {
        box-shadow: 0 4px 12px var(--main-shadow), 0 0 0 10px rgba(243, 156, 18, 0);
    }
    100% {
        box-shadow: 0 4px 8px var(--main-shadow), 0 0 0 0 rgba(243, 156, 18, 0);
    }
}


/* --- From notification.css --- */
/* src/assets/notification.css */

.tc-notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 2147483647;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.tc-notification {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    background-color: var(--main-bg, #fff);
    color: var(--main-text, #333);
    box-shadow: 0 4px 12px var(--main-shadow, rgba(0, 0, 0, 0.15));
    border: 1px solid var(--main-border, #eee);
    width: 320px;
    opacity: 0;
    transform: translateX(100%);
    animation: tc-notification-fade-in 0.5s forwards;
    transition: box-shadow 0.3s;
}

.tc-notification:hover {
    box-shadow: 0 6px 16px var(--main-shadow, rgba(0, 0, 0, 0.2));
}

.tc-notification-icon {
    margin-right: 12px;
    display: flex;
    align-items: center;
}

.tc-notification-icon svg {
    width: 20px;
    height: 20px;
}

.tc-notification-info .tc-notification-icon {
    color: #3498db;
}

.tc-notification-success .tc-notification-icon {
    color: #2ecc71;
}

.tc-notification-content {
    flex-grow: 1;
    font-size: 14px;
    line-height: 1.4;
}

.tc-notification-close {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;
    padding: 4px;
}

.tc-notification-close:hover {
    opacity: 1;
}

.tc-notification-close svg {
    width: 16px;
    height: 16px;
    stroke: var(--main-text, #333);
}

@keyframes tc-notification-fade-in {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.tc-notification-fade-out {
    animation: tc-notification-fade-out 0.5s forwards;
}

@keyframes tc-notification-fade-out {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(100%);
    }
}

/* --- From placeholder.css --- */
/* src/assets/styles/placeholder.css */

#modal-placeholder {
    display: none; /* 默认隐藏 */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--text-color-secondary);
    padding: 20px;
    /* height: 100%; */ /* 移除此行以避免影响父容器高度 */
    box-sizing: border-box;
    /* 确保占位符本身也能填满其容器空间 */
    width: 100%;
    height: 100%;
}

.placeholder-icon {
    margin-bottom: 16px;
    color: var(--text-color-secondary); /* 将颜色设置移到这里 */
}

.placeholder-icon svg {
    width: 48px;
    height: 48px;
    /* fill 属性现在由 "currentColor" 在SVG代码中控制，会自动继承父元素的color */
}

#modal-placeholder p {
    margin: 4px 0;
    font-size: 14px;
}

.placeholder-actions {
    display: flex;
    align-items: center;
    gap: 6px; /* 图标和文字之间的间距 */
    color: var(--text-color-primary);
}

.placeholder-action-icon svg {
    width: 18px;
    height: 18px;
    fill: currentColor; /* 继承父元素颜色 */
    vertical-align: middle;
}

#modal-placeholder strong {
    font-weight: 600;
}

/* --- From settings-panel.css --- */
/* src/assets/styles/settings-panel.css */

.settings-panel-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: var(--main-overlay-bg);
  z-index: 10002;
  display: flex;
  justify-content: center;
  align-items: center;
  /* --- 新增：动画相关属性 --- */
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s;
}

/* 新增：可见状态 */
.settings-panel-overlay.is-visible {
    opacity: 1;
    visibility: visible;
}

.settings-panel-modal {
  background-color: var(--main-bg);
  color: var(--main-text);
  border: 1px solid var(--main-border);
  border-radius: 16px; /* 增大圆角 */
  box-shadow: 0 5px 15px var(--main-shadow);
  width: 90%;
  max-width: 400px;
  /* --- 新增：动画相关属性 --- */
  transform: scale(0.95);
  transition: transform 0.3s ease;
}

/* 新增：可见状态下的模态框样式 */
.settings-panel-overlay.is-visible .settings-panel-modal {
    transform: scale(1);
}
.settings-panel-header, .settings-panel-content, .settings-panel-footer {
  padding: 16px;
}
.settings-panel-header {
  display: flex; justify-content: space-between; align-items: center;
  border-bottom: 1px solid var(--main-border);
  font-weight: bold;
  font-size: 18px;
}
/* 关闭按钮的旧样式已被 .tc-close-button 替代，此处可删除或留空 */
.settings-panel-close {}

.setting-item { margin-bottom: 16px; }
.setting-item > label { display: block; margin-bottom: 8px; font-weight: 500; }

/* -- 新增：为分组小标题单独设置加粗 -- */
#theme-setting-title-container,
#filter-setting-title-container {
  font-weight: bold;
  font-size: 16px;
}

/* -- 全新重构的自定义复选框样式 -- */
.checkbox-group {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-top: 12px;
  cursor: pointer;
  user-select: none;
  height: 20px;
  line-height: 20px;
  color: var(--main-text);
}

/* 彻底隐藏原生的复选框 */
.checkbox-group input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* 创建一个假的复选框容器 */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: var(--main-textarea-bg);
  border: 1px solid var(--main-textarea-border);
  border-radius: 3px;
  transition: all 0.2s;
}

/* 当鼠标悬停时，给一个反馈 */
.checkbox-group:hover input ~ .checkmark {
  border-color: var(--main-primary);
}

/* 当复选框被选中时，改变背景和边框颜色 */
.checkbox-group input:checked ~ .checkmark {
  background-color: var(--main-primary);
  border-color: var(--main-primary);
}

/* 创建勾选标记 (✓)，默认隐藏 */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* 当复选框被选中时，显示勾选标记 */
.checkbox-group input:checked ~ .checkmark:after {
  display: block;
}

/* 勾选标记的样式 */
.checkbox-group .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid var(--main-bg);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
/* -- 结束自定义复选框样式 -- */

.settings-panel-footer {
  border-top: 1px solid var(--main-border);
  text-align: right;
}

    `;
    GM_addStyle(css);
})();


(() => {
  // src/assets/icon.js
  var translateIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"/></svg>`;

  // src/assets/dynamicIcon.js
  var dynamicIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-766v572q-17-17-32-36t-28-39v-422q13-20 28-39t32-36Zm160-96v764q-21-7-41-15.5T280-133v-694q19-11 39-19.5t41-15.5Zm280 749v-734q106 47 173 145t67 222q0 124-67 222T640-113ZM480-80q-10 0-20-.5T440-82v-796q10-1 20-1.5t20-.5q20 0 40 2t40 6v784q-20 4-40 6t-40 2Z"/></svg>`;

  // src/assets/stopIcon.js
  var stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M280-280v-400h400v400H280Z"/></svg>`;

  // src/assets/summaryIcon.js
  var summaryIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>`;

  // src/core/settings.js
  var defaultSettings = {
    // 主题设置, 可选值: 'light', 'dark', 'system'
    theme: "system",
    // 过滤规则设置
    filterRules: {
      // 是否过滤纯数字和货币符号组成的字符串
      numbers: true,
      // 是否过滤纯中文字符串
      chinese: true,
      // 是否过滤包含中文字符的字符串
      containsChinese: false,
      // 是否过滤纯表情符号字符串
      emojiOnly: true,
      // 是否过滤纯符号字符串
      symbols: true,
      // 是否过滤特定术语列表中的字符串
      termFilter: true
    }
  };
  function loadSettings() {
    const savedSettings = GM_getValue("script_settings", null);
    if (savedSettings) {
      try {
        return {
          ...defaultSettings,
          ...JSON.parse(savedSettings)
        };
      } catch (error) {
        console.error("\u89E3\u6790\u5DF2\u4FDD\u5B58\u7684\u8BBE\u7F6E\u65F6\u51FA\u9519:", error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  }
  function saveSettings(settings) {
    if (typeof settings !== "object" || settings === null) {
      console.error("\u5C1D\u8BD5\u4FDD\u5B58\u7684\u8BBE\u7F6E\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u5BF9\u8C61:", settings);
      return;
    }
    GM_setValue("script_settings", JSON.stringify(settings));
  }

  // src/config.js
  var config = {
    /**
     * 定义了文本提取的目标CSS选择器。
     * 默认情况下，脚本会尝试从以下标签和类名中提取文本。
     * 你可以根据需要添加、修改或删除这些选择器，以适应特定的网站或需求。
     * @example
     * // 只提取文章段落和标题
     * selectors: ['article p', 'h1', 'h2']
     * // 针对特定网站的定制
     * selectors: ['.main-content', '.comment-text']
     */
    selectors: [
      // --- 基础文本元素 ---
      "p",
      // 段落
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      // 标题
      "li",
      // 列表项
      "td",
      // 表格单元格
      "th",
      // 表头
      "pre",
      // 预格式化文本
      "span",
      // 常用于包裹零散文本
      "a",
      // 链接文本
      "button",
      // 按钮文本
      // --- 容器与特定区域 ---
      "article",
      // 文章内容
      "main",
      // 主要内容区域
      "div",
      // 通用容器
      // --- 新增：覆盖所有元素以检查属性 ---
      // 通过这个宽泛的选择器，我们可以检查所有元素的
      // title, alt, placeholder, aria-label 等属性。
      // processor.js 中的逻辑会确保只提取有内容的属性。
      "body *"
    ],
    /**
     * @property {string} modalContentHeight - 主模态框内容区域的默认高度。
     * 可以使用任何有效的CSS高度值（例如 '400px', '80vh'）。
     */
    modalContentHeight: "400px"
  };
  var config_default = config;

  // src/core/ignoredTerms.js
  var IGNORED_TERMS = [
    "Github",
    "Microsoft",
    "Tampermonkey",
    "JavaScript"
  ];
  var ignoredTerms_default = IGNORED_TERMS;

  // src/core/ignoredSelectors.js
  var IGNORED_SELECTORS = [
    // --- 语义化标签 ---
    "script",
    // 脚本
    "style",
    // 样式
    "noscript",
    // script 禁用时显示的内容
    "code",
    // 代码片段
    "pre",
    // 预格式化文本，通常用于展示代码
    "kbd",
    // 键盘输入
    // --- 常见的非内容区域 (可以根据需要添加) ---
    ".no-translate"
    // 一个通用的、用于明确指示不翻译的类名
    // '.navbar',
    // 'header',
    // 'footer',
    // '[role="navigation"]',
  ];
  var ignoredSelectors_default = IGNORED_SELECTORS;

  // src/core/processor.js
  var numberAndCurrencyRegex = /^[$\€\£\¥\d,.\s]+$/;
  var pureChineseRegex = /^[\u4e00-\u9fa5\s]+$/u;
  var containsChineseRegex = /[\u4e00-\u9fa5]/u;
  var emojiOnlyRegex = /^[\p{Emoji}\s]+$/u;
  var containsLetterOrNumberRegex = /[\p{L}\p{N}]/u;
  var extractAndProcessText = () => {
    const settings = loadSettings();
    const { filterRules } = settings;
    const { selectors } = config_default;
    const uniqueTexts = /* @__PURE__ */ new Set();
    const processAndAddText2 = (rawText) => {
      if (!rawText) return;
      const normalizedText = rawText.normalize("NFC");
      let text = normalizedText.replace(/(\r\n|\n|\r)+/g, "\n");
      if (text.trim() === "") {
        return;
      }
      const trimmedText = text.trim();
      if (filterRules.numbers && numberAndCurrencyRegex.test(trimmedText)) return;
      if (filterRules.chinese && pureChineseRegex.test(trimmedText)) return;
      if (filterRules.containsChinese && containsChineseRegex.test(trimmedText)) return;
      if (filterRules.emojiOnly && emojiOnlyRegex.test(trimmedText)) return;
      if (filterRules.symbols && !containsLetterOrNumberRegex.test(trimmedText)) return;
      if (filterRules.termFilter && ignoredTerms_default.includes(trimmedText)) return;
      uniqueTexts.add(text);
    };
    processAndAddText2(document.title);
    const targetElements = document.querySelectorAll(selectors.join(", "));
    const ignoredSelectorString = ignoredSelectors_default.join(", ");
    targetElements.forEach((element) => {
      if (element.closest(ignoredSelectorString)) {
        return;
      }
      const attributesToExtract = ["placeholder", "alt", "title", "aria-label"];
      if (element.tagName === "INPUT" && ["button", "submit", "reset"].includes(element.type)) {
        attributesToExtract.push("value");
      }
      attributesToExtract.forEach((attr) => {
        const attrValue = element.getAttribute(attr);
        if (attrValue) {
          processAndAddText2(attrValue);
        }
      });
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const parent = node.parentElement;
        if (parent && (parent.tagName === "SCRIPT" || parent.tagName === "STYLE")) {
          continue;
        }
        if (parent && parent.closest(".text-extractor-fab, .text-extractor-modal-overlay, .settings-panel-overlay")) {
          continue;
        }
        processAndAddText2(node.nodeValue);
      }
    });
    return Array.from(uniqueTexts);
  };
  var formatTextsForTranslation = (texts) => {
    const result = texts.map(
      (text) => (
        // 2. 对每个字符串进行处理：
        //    - 将字符串中的双引号 " 转义为 \"
        //    - 将字符串中的换行符 \n 转义为 \\n
        //    - 然后按照 `["...", ""]` 的格式包裹起来
        `    ["${text.replace(/"/g, '\\"').replace(/\n/g, "\\n")}", ""]`
      )
    );
    return `[
${result.join(",\n")}
]`;
  };

  // src/core/sessionExtractor.js
  var isRecording = false;
  var sessionTexts = /* @__PURE__ */ new Set();
  var observer = null;
  var onTextAddedCallback = null;
  var numberAndCurrencyRegex2 = /^[$\€\£\¥\d,.\s]+$/;
  var pureChineseRegex2 = /^[\u4e00-\u9fa5\s]+$/u;
  var containsChineseRegex2 = /[\u4e00-\u9fa5]/u;
  var emojiOnlyRegex2 = /^[\p{Emoji}\s]+$/u;
  var containsLetterOrNumberRegex2 = /[\p{L}\p{N}]/u;
  function processAndAddText(rawText, textSet, filterRules) {
    if (!rawText || typeof rawText !== "string") return false;
    let text = rawText.replace(/(\r\n|\n|\r)+/g, "\n").trim();
    if (text === "") return false;
    if (filterRules.numbers && numberAndCurrencyRegex2.test(text)) return false;
    if (filterRules.chinese && pureChineseRegex2.test(text)) return false;
    if (filterRules.containsChinese && containsChineseRegex2.test(text)) return false;
    if (filterRules.emojiOnly && emojiOnlyRegex2.test(text)) return false;
    if (filterRules.symbols && !containsLetterOrNumberRegex2.test(text)) return false;
    if (filterRules.termFilter && ignoredTerms_default.includes(text)) return false;
    const originalSize = textSet.size;
    textSet.add(rawText.replace(/(\r\n|\n|\r)+/g, "\n"));
    return textSet.size > originalSize;
  }
  var handleMutations = (mutations) => {
    const { filterRules } = loadSettings();
    const ignoredSelectorString = ignoredSelectors_default.join(", ");
    let textAdded = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (node.closest(ignoredSelectorString)) return;
        const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          if (processAndAddText(walker.currentNode.nodeValue, sessionTexts, filterRules)) {
            textAdded = true;
          }
        }
      });
    });
    if (textAdded && onTextAddedCallback) {
      onTextAddedCallback(sessionTexts.size);
    }
  };
  var start = (onUpdate) => {
    if (isRecording) return;
    console.log("\u5F00\u59CB\u65B0\u7684\u63D0\u53D6\u4F1A\u8BDD...");
    isRecording = true;
    sessionTexts.clear();
    onTextAddedCallback = onUpdate || null;
    const initialTexts = extractAndProcessText();
    const { filterRules } = loadSettings();
    let textAdded = false;
    initialTexts.forEach((text) => {
      if (processAndAddText(text, sessionTexts, filterRules)) {
        textAdded = true;
      }
    });
    console.log(`\u4F1A\u8BDD\u521D\u59CB\u6355\u83B7\u5230 ${sessionTexts.size} \u6761\u6587\u672C\u3002`);
    if (onTextAddedCallback) {
      onTextAddedCallback(sessionTexts.size);
    }
    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, { childList: true, subtree: true });
  };
  var stop = () => {
    if (!isRecording) return [];
    console.log("\u505C\u6B62\u63D0\u53D6\u4F1A\u8BDD\u3002");
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    isRecording = false;
    onTextAddedCallback = null;
    return getSessionTexts();
  };
  var isSessionRecording = () => isRecording;
  var getSessionTexts = () => Array.from(sessionTexts);

  // src/ui/components/notification.js
  var notificationContainer = null;
  function getNotificationContainer() {
    if (!notificationContainer) {
      notificationContainer = document.createElement("div");
      notificationContainer.className = "tc-notification-container";
      document.body.appendChild(notificationContainer);
    }
    return notificationContainer;
  }
  function createNotificationElement(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `tc-notification tc-notification-${type}`;
    const icon = type === "success" ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    notification.innerHTML = `
        <div class="tc-notification-icon">${icon}</div>
        <div class="tc-notification-content">${message}</div>
        <div class="tc-notification-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
    `;
    const closeButton = notification.querySelector(".tc-notification-close");
    closeButton.addEventListener("click", () => {
      notification.classList.add("tc-notification-fade-out");
      notification.addEventListener("animationend", () => {
        notification.remove();
        if (getNotificationContainer().childElementCount === 0) {
          notificationContainer.remove();
          notificationContainer = null;
        }
      });
    });
    return notification;
  }
  function showNotification(message, { type = "info", duration = 3e3 } = {}) {
    const container = getNotificationContainer();
    const notification = createNotificationElement(message, type);
    container.appendChild(notification);
    const timer = setTimeout(() => {
      notification.querySelector(".tc-notification-close").click();
    }, duration);
    notification.querySelector(".tc-notification-close").addEventListener("click", () => {
      clearTimeout(timer);
    });
  }

  // src/ui/components/liveCounter.js
  var counterElement = null;
  function createCounterElement() {
    if (counterElement) return;
    counterElement = document.createElement("div");
    counterElement.className = "tc-live-counter";
    document.body.appendChild(counterElement);
  }
  function showLiveCounter() {
    createCounterElement();
    requestAnimationFrame(() => {
      counterElement.classList.add("tc-live-counter-visible");
    });
    updateLiveCounter(0);
  }
  function hideLiveCounter() {
    if (!counterElement) return;
    counterElement.classList.remove("tc-live-counter-visible");
  }
  function updateLiveCounter(count) {
    if (!counterElement) return;
    counterElement.innerHTML = `\u5DF2\u53D1\u73B0\uFF1A<span>${count}</span>`;
  }

  // src/ui/components.js
  function createCheckbox(id, label, isChecked) {
    return `
    <label class="checkbox-group" for="${id}">${label}
      <input type="checkbox" id="${id}" ${isChecked ? "checked" : ""}>
      <span class="checkmark"></span>
    </label>
  `;
  }

  // src/ui/components/iconTitle.js
  function createIconTitle(iconSVG, text) {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "8px";
    const iconWrapper = document.createElement("span");
    iconWrapper.innerHTML = iconSVG;
    iconWrapper.style.display = "flex";
    iconWrapper.style.alignItems = "center";
    const textNode = document.createTextNode(text);
    container.appendChild(iconWrapper);
    container.appendChild(textNode);
    return container;
  }

  // src/assets/copyIcon.js
  var copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg>`;

  // src/assets/infoIcon.js
  var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>';

  // src/ui/components/mainModal.js
  var modalOverlay = null;
  var outputTextarea = null;
  var placeholder = null;
  var SHOW_PLACEHOLDER = "::show_placeholder::";
  var handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };
  function createMainModal() {
    if (modalOverlay) return;
    modalOverlay = document.createElement("div");
    modalOverlay.className = "text-extractor-modal-overlay";
    modalOverlay.innerHTML = `
    <div class="text-extractor-modal">
      <div class="text-extractor-modal-header">
        <div id="main-modal-title-container"></div>
        <span class="tc-close-button text-extractor-modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </span>
      </div>
      <div class="text-extractor-modal-content">
        <div id="modal-placeholder"></div>
        <textarea id="text-extractor-output" class="tc-textarea"></textarea>
      </div>
      <div class="text-extractor-modal-footer">
        <button class="text-extractor-copy-btn tc-button">\u4E00\u952E\u590D\u5236</button>
      </div>
    </div>
  `;
    document.body.appendChild(modalOverlay);
    const modalContent = modalOverlay.querySelector(".text-extractor-modal-content");
    if (config_default.modalContentHeight) {
      modalContent.style.height = config_default.modalContentHeight;
    }
    const titleContainer = document.getElementById("main-modal-title-container");
    const titleElement = createIconTitle(summaryIcon, "\u63D0\u53D6\u7684\u6587\u672C");
    titleContainer.appendChild(titleElement);
    outputTextarea = document.getElementById("text-extractor-output");
    placeholder = document.getElementById("modal-placeholder");
    const closeBtn = modalOverlay.querySelector(".text-extractor-modal-close");
    const copyBtn = modalOverlay.querySelector(".text-extractor-copy-btn");
    placeholder.innerHTML = `
    <div class="placeholder-icon">${infoIcon}</div>
    <p>\u5F53\u524D\u6CA1\u6709\u603B\u7ED3\u6587\u672C</p>
    <p class="placeholder-actions">
      \u70B9\u51FB <span class="placeholder-action-icon">${dynamicIcon}</span><strong>[\u52A8\u6001\u626B\u63CF]</strong> \u6309\u94AE\u5F00\u59CB\u4E00\u4E2A\u65B0\u7684\u626B\u63CF\u4F1A\u8BDD
    </p>
    <p class="placeholder-actions">
      \u70B9\u51FB <span class="placeholder-action-icon">${translateIcon}</span><strong>[\u9759\u6001\u626B\u63CF]</strong> \u6309\u94AE\u53EF\u8FDB\u884C\u4E00\u6B21\u6027\u7684\u5FEB\u6377\u63D0\u53D6
    </p>
  `;
    copyBtn.innerHTML = "";
    const copyBtnContent = createIconTitle(copyIcon, "\u590D\u5236");
    copyBtn.appendChild(copyBtnContent);
    closeBtn.addEventListener("click", closeModal);
    copyBtn.addEventListener("click", () => {
      const textToCopy = outputTextarea.value;
      GM_setClipboard(textToCopy, "text");
      showNotification("\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F", { type: "success" });
    });
  }
  function openModal() {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    updateModalContent("\u6587\u672C\u63D0\u53D6\u4E2D...", true);
    setTimeout(() => {
      const extractedTexts = extractAndProcessText();
      const formattedText = formatTextsForTranslation(extractedTexts);
      const copyBtn = modalOverlay.querySelector(".text-extractor-copy-btn");
      updateModalContent(formattedText, false);
      copyBtn.disabled = false;
      showNotification(`\u5FEB\u6377\u626B\u63CF\u5B8C\u6210\uFF0C\u53D1\u73B0 ${extractedTexts.length} \u6761\u6587\u672C`, { type: "success" });
    }, 50);
  }
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("is-visible");
      document.removeEventListener("keydown", handleKeyDown);
    }
  }
  function updateModalContent(content, shouldOpen = false) {
    if (!modalOverlay) {
      console.error("\u6A21\u6001\u6846\u5C1A\u672A\u521D\u59CB\u5316\u3002");
      return;
    }
    const copyBtn = modalOverlay.querySelector(".text-extractor-copy-btn");
    if (content === SHOW_PLACEHOLDER) {
      placeholder.style.display = "flex";
      outputTextarea.style.display = "none";
      copyBtn.disabled = true;
    } else {
      placeholder.style.display = "none";
      outputTextarea.style.display = "block";
      const isData = content.trim().startsWith("[");
      outputTextarea.value = content;
      copyBtn.disabled = !isData;
      outputTextarea.readOnly = !isData;
    }
    if (shouldOpen) {
      modalOverlay.classList.add("is-visible");
      document.addEventListener("keydown", handleKeyDown);
    }
  }

  // src/ui/components/fab.js
  function createSingleFab(className, innerHTML, title, onClick) {
    const fab = document.createElement("div");
    fab.className = `text-extractor-fab ${className}`;
    fab.innerHTML = innerHTML;
    fab.title = title;
    fab.addEventListener("click", onClick);
    return fab;
  }
  function createFab(onStaticExtract) {
    const fabContainer = document.createElement("div");
    fabContainer.className = "text-extractor-fab-container";
    const summaryFab = createSingleFab(
      "fab-summary",
      summaryIcon,
      "\u67E5\u770B\u4F1A\u8BDD\u603B\u7ED3",
      handleSummaryClick
    );
    const dynamicFab = createSingleFab(
      "fab-dynamic",
      dynamicIcon,
      "\u5F00\u59CB\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD",
      handleDynamicExtractClick
    );
    const staticFab = createSingleFab(
      "fab-static",
      translateIcon,
      "\u5FEB\u6377\u63D0\u53D6\u5F53\u524D\u9875\u9762\u6240\u6709\u6587\u672C",
      onStaticExtract
    );
    fabContainer.appendChild(summaryFab);
    fabContainer.appendChild(dynamicFab);
    fabContainer.appendChild(staticFab);
    document.body.appendChild(fabContainer);
    setTimeout(() => {
      fabContainer.classList.add("fab-container-visible");
    }, 50);
    function handleSummaryClick() {
      const results = getSessionTexts();
      if (results.length === 0) {
        updateModalContent(SHOW_PLACEHOLDER, true);
      } else {
        const formattedText = formatTextsForTranslation(results);
        updateModalContent(formattedText, true);
      }
    }
    function handleDynamicExtractClick() {
      if (isSessionRecording()) {
        const results = stop();
        dynamicFab.innerHTML = dynamicIcon;
        dynamicFab.classList.remove("is-recording");
        dynamicFab.title = "\u5F00\u59CB\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD";
        hideLiveCounter();
        showNotification(`\u626B\u63CF\u7ED3\u675F\uFF0C\u5171\u53D1\u73B0 ${results.length} \u6761\u6587\u672C`, { type: "success" });
      } else {
        dynamicFab.innerHTML = stopIcon;
        dynamicFab.classList.add("is-recording");
        dynamicFab.title = "\u505C\u6B62\u52A8\u6001\u626B\u63CF\u4F1A\u8BDD";
        showNotification("\u4F1A\u8BDD\u626B\u63CF\u5DF2\u5F00\u59CB", { type: "info" });
        showLiveCounter();
        setTimeout(() => {
          start(updateLiveCounter);
        }, 50);
      }
    }
  }

  // src/ui/index.js
  function initUI() {
    createMainModal();
    createFab(openModal);
  }

  // src/ui/theme.js
  function initTheme() {
    const { theme } = loadSettings();
    applyTheme(theme);
  }
  function applyTheme(theme) {
    let finalTheme = theme;
    if (theme === "system") {
      finalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    document.body.setAttribute("data-theme", finalTheme);
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const { theme } = loadSettings();
    if (theme === "system") {
      applyTheme("system");
    }
  });

  // src/assets/settingsIcon.js
  var settingsIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>`;

  // src/assets/themeIcon.js
  var themeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/></svg>`;

  // src/assets/filterIcon.js
  var filterIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z"/></svg>`;

  // src/assets/saveIcon.js
  var saveIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>`;

  // src/ui/components/customSelect.js
  var CustomSelect = class {
    /**
     * @param {HTMLElement} parentElement - 组件将被附加到的父容器。
     * @param {Array<Object>} options - 选项数组，每个对象包含 { value, label, icon }。
     * @param {string} initialValue - 初始选中的值。
     */
    constructor(parentElement, options, initialValue) {
      this.parentElement = parentElement;
      this.options = options;
      this.currentValue = initialValue;
      this.isOpen = false;
      this.render();
      this.bindEvents();
    }
    /**
     * @private
     * @description 渲染组件的 HTML 结构。
     */
    render() {
      this.container = document.createElement("div");
      this.container.className = "custom-select-container";
      const initialOption = this.options.find((opt) => opt.value === this.currentValue);
      this.container.innerHTML = `
            <div class="custom-select-trigger">
                <div class="selected-option-content"></div>
                <div class="custom-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                </div>
            </div>
            <div class="custom-select-options"></div>
        `;
      this.parentElement.appendChild(this.container);
      this.trigger = this.container.querySelector(".custom-select-trigger");
      this.optionsContainer = this.container.querySelector(".custom-select-options");
      this.selectedContent = this.container.querySelector(".selected-option-content");
      this.populateOptions();
      this.updateSelectedContent(initialOption);
    }
    /**
     * @private
     * @description 填充选项列表。
     */
    populateOptions() {
      this.options.forEach((option) => {
        const optionEl = document.createElement("div");
        optionEl.className = "custom-select-option";
        optionEl.dataset.value = option.value;
        if (option.value === this.currentValue) {
          optionEl.classList.add("selected");
        }
        const optionContent = createIconTitle(option.icon, option.label);
        optionEl.appendChild(optionContent);
        this.optionsContainer.appendChild(optionEl);
      });
    }
    /**
     * @private
     * @description 更新触发器区域显示的内容。
     * @param {Object} option - 被选中的选项对象。
     */
    updateSelectedContent(option) {
      const content = createIconTitle(option.icon, option.label);
      this.selectedContent.innerHTML = "";
      this.selectedContent.appendChild(content);
    }
    /**
     * @private
     * @description 绑定所有必要的事件监听器。
     */
    bindEvents() {
      this.trigger.addEventListener("click", () => this.toggle());
      this.optionsContainer.addEventListener("click", (e) => {
        const optionEl = e.target.closest(".custom-select-option");
        if (optionEl) {
          this.select(optionEl.dataset.value);
        }
      });
      document.addEventListener("click", (e) => {
        if (!this.container.contains(e.target)) {
          this.close();
        }
      });
    }
    /**
     * @public
     * @description 切换下拉菜单的打开/关闭状态。
     */
    toggle() {
      this.isOpen = !this.isOpen;
      this.container.classList.toggle("open", this.isOpen);
    }
    /**
     * @public
     * @description 关闭下拉菜单。
     */
    close() {
      if (this.isOpen) {
        this.isOpen = false;
        this.container.classList.remove("open");
      }
    }
    /**
     * @public
     * @description 选择一个选项。
     * @param {string} value - 要选择的选项的 value。
     */
    select(value) {
      if (value === this.currentValue) {
        this.close();
        return;
      }
      this.currentValue = value;
      const selectedOption = this.options.find((opt) => opt.value === value);
      this.updateSelectedContent(selectedOption);
      this.optionsContainer.querySelector(".custom-select-option.selected")?.classList.remove("selected");
      this.optionsContainer.querySelector(`[data-value="${value}"]`).classList.add("selected");
      this.close();
    }
    /**
     * @public
     * @returns {string} - 返回当前选中的值。
     */
    getValue() {
      return this.currentValue;
    }
  };

  // src/assets/systemThemeIcon.js
  var systemThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-120v-80h80v-80H160q-33 0-56.5-23.5T80-360v-400q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v400q0 33-23.5 56.5T800-280H560v80h80v80H320ZM160-360h640v-400H160v400Zm0 0v-400 400Z"/></svg>`;

  // src/assets/lightThemeIcon.js
  var lightThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>`;

  // src/assets/darkThemeIcon.js
  var darkThemeIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>`;

  // src/ui/settingsPanel.js
  var settingsPanel = null;
  var themeSelectComponent = null;
  var filterDefinitions = [
    { id: "filter-numbers", key: "numbers", label: "\u8FC7\u6EE4\u7EAF\u6570\u5B57/\u8D27\u5E01" },
    { id: "filter-chinese", key: "chinese", label: "\u8FC7\u6EE4\u7EAF\u4E2D\u6587" },
    { id: "filter-contains-chinese", key: "containsChinese", label: "\u8FC7\u6EE4\u5305\u542B\u4E2D\u6587\u7684\u6587\u672C" },
    { id: "filter-emoji-only", key: "emojiOnly", label: "\u8FC7\u6EE4\u7EAF\u8868\u60C5\u7B26\u53F7" },
    { id: "filter-symbols", key: "symbols", label: "\u8FC7\u6EE4\u7EAF\u7B26\u53F7" },
    { id: "filter-term", key: "termFilter", label: "\u8FC7\u6EE4\u7279\u5B9A\u672F\u8BED" }
  ];
  function getPanelHTML(settings) {
    const filterCheckboxesHTML = filterDefinitions.map((filter) => createCheckbox(filter.id, filter.label, settings.filterRules[filter.key])).join("");
    return `
    <div class="settings-panel-modal">
      <div class="settings-panel-header">
        <div id="settings-panel-title-container"></div>
        <span class="tc-close-button settings-panel-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </span>
      </div>
      <div class="settings-panel-content">
        <div class="setting-item">
          <div id="theme-setting-title-container"></div>
          <div id="custom-select-wrapper"></div>
        </div>
        <div class="setting-item">
          <div id="filter-setting-title-container"></div>
          ${filterCheckboxesHTML}
        </div>
      </div>
      <div class="settings-panel-footer">
        <button id="save-settings-btn" class="tc-button">\u4FDD\u5B58</button>
      </div>
    </div>
  `;
  }
  var handleKeyDown2 = (event) => {
    if (event.key === "Escape") {
      hideSettingsPanel();
    }
  };
  function showSettingsPanel() {
    if (settingsPanel) {
      setTimeout(() => settingsPanel.classList.add("is-visible"), 10);
      return;
    }
    const currentSettings = loadSettings();
    settingsPanel = document.createElement("div");
    settingsPanel.className = "settings-panel-overlay";
    settingsPanel.innerHTML = getPanelHTML(currentSettings);
    document.body.appendChild(settingsPanel);
    setTimeout(() => {
      if (settingsPanel) {
        settingsPanel.classList.add("is-visible");
      }
    }, 10);
    const titleContainer = document.getElementById("settings-panel-title-container");
    const titleElement = createIconTitle(settingsIcon, "\u811A\u672C\u8BBE\u7F6E");
    titleContainer.appendChild(titleElement);
    const themeTitleContainer = document.getElementById("theme-setting-title-container");
    const themeTitleElement = createIconTitle(themeIcon, "\u754C\u9762\u4E3B\u9898");
    themeTitleContainer.appendChild(themeTitleElement);
    themeTitleContainer.style.marginBottom = "8px";
    const filterTitleContainer = document.getElementById("filter-setting-title-container");
    const filterTitleElement = createIconTitle(filterIcon, "\u5185\u5BB9\u8FC7\u6EE4\u89C4\u5219");
    filterTitleContainer.appendChild(filterTitleElement);
    filterTitleContainer.style.marginBottom = "8px";
    const selectWrapper = document.getElementById("custom-select-wrapper");
    const themeOptions = [
      { value: "system", label: "\u8DDF\u968F\u7CFB\u7EDF", icon: systemThemeIcon },
      { value: "light", label: "\u6D45\u8272\u6A21\u5F0F", icon: lightThemeIcon },
      { value: "dark", label: "\u6DF1\u8272\u6A21\u5F0F", icon: darkThemeIcon }
    ];
    themeSelectComponent = new CustomSelect(selectWrapper, themeOptions, currentSettings.theme);
    const saveBtn = settingsPanel.querySelector("#save-settings-btn");
    saveBtn.innerHTML = "";
    const saveBtnContent = createIconTitle(saveIcon, "\u4FDD\u5B58");
    saveBtn.appendChild(saveBtnContent);
    settingsPanel.querySelector(".settings-panel-close").addEventListener("click", hideSettingsPanel);
    saveBtn.addEventListener("click", handleSave);
    document.addEventListener("keydown", handleKeyDown2);
  }
  function hideSettingsPanel() {
    if (settingsPanel) {
      document.removeEventListener("keydown", handleKeyDown2);
      settingsPanel.classList.remove("is-visible");
      setTimeout(() => {
        if (settingsPanel) {
          settingsPanel.remove();
          settingsPanel = null;
        }
      }, 300);
    }
  }
  function handleSave() {
    const newTheme = themeSelectComponent.getValue();
    const newFilterRules = {};
    filterDefinitions.forEach((filter) => {
      const checkbox = document.getElementById(filter.id);
      if (checkbox) {
        newFilterRules[filter.key] = checkbox.checked;
      }
    });
    const newSettings = {
      theme: newTheme,
      filterRules: newFilterRules
    };
    saveSettings(newSettings);
    applyTheme(newSettings.theme);
    alert("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58\uFF01");
    hideSettingsPanel();
  }
  function initSettingsPanel() {
    GM_registerMenuCommand("\u6253\u5F00\u8BBE\u7F6E", showSettingsPanel);
  }

  // src/main.js
  (function() {
    "use strict";
    initTheme();
    initUI();
    initSettingsPanel();
  })();
})();
