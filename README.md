# Home Dashboard Card for Home Assistant

A Lovelace custom card that recreates the "Home Dashboard" design: floor plan with Lights / Temperature / Floor heating / Energy layers, quick scenes, per-room controls (lights with dimming, AC with modes and setpoint, floor heating) and today's energy chart.

## Install

1. Copy `home-dashboard-card.js` to `/config/www/home-dashboard-card/home-dashboard-card.js`.
2. Settings → Dashboards → ⋮ → **Resources** → Add resource
   URL `/local/home-dashboard-card/home-dashboard-card.js?v=1`, type **JavaScript module**.
   (Bump `?v=` after every update so the phone app reloads it.)
3. Create a dashboard and paste `examples/home-dashboard.yaml` into the raw configuration editor, **or** add the card from the card picker ("Home Dashboard Card"). The picker pre-fills rooms from your HA areas.

Use a **Panel** view (as in the example) or a Sections view — the card spans full width. Below 820 px wide (phones, the HA companion app) it switches to a single column: plan → room → energy; tapping a room on the plan scrolls to its controls, and the room tabs stick under the HA header.

## Language & formats

Text follows the language in your HA profile (`hass.locale.language`): English, Română, Deutsch, Français, Español, Italiano (others fall back to English). Climate mode names, numbers (decimal separator), dates, 12/24 h time and currency come from HA's own settings and translations. Override with `language: ro`, or add your own strings:

```yaml
translations:
  hu: { quick_scenes: "Gyors jelenetek", your_home: "Otthon" }
```

## Configuration

Everything except walls and per-entity display names can be set in the visual editor; choosing an **Area** on an empty room fills in its lights, climate devices and sensors automatically.

| Key | Description |
|---|---|
| `power_entity` | Total house power sensor (W/kW). "Using now" + current-hour bar. |
| `energy_entity` | Total energy sensor (kWh, `total_increasing`). Hourly bars from recorder statistics. Without it, hourly means of `power_entity` are used. |
| `energy_today_entity` / `cost_entity` / `price` | Optional overrides for "used so far" / "estimated cost". |
| `scenes` | List of `scene.*`, `script.*`, `button.*` (string or `{entity, name, description}`). |
| `circuits` | Power sensors for "What's using power right now". `{entity, name, color}` allowed. |
| `walls` | `design` (the original apartment) or a list of `[x, y, w, h]` in plan units. |
| `plan_width` / `plan_height` | Plan coordinate system, default 600 × 500. |
| `temp_range` / `floor_range` | Colour scales, default `[19, 25]` and `[21, 29]`. |
| `rooms[]` | `name`, `area`, `lights`, `temperature`, `humidity`, `power`, `climate` (AC), `floor_heating` (climate, switch or input_boolean), `floor_temperature`, `plan: {x,y,w,h}`, `annex: {x,y,w,h}` for L-shaped rooms. |

Rooms without `plan` are shown as tiles instead of a floor plan.

**Gestures:** tap toggles; long-press (or right-click) on a light, scene, AC/floor-heating header or circuit opens HA's more-info dialog. Setpoint taps are debounced, so several quick +/− presses send one command.

## HACS

Add this repository as a custom repository in HACS (category **Dashboard**), install, and HACS adds the resource for you.

## Repository layout

- `home-dashboard-card.js` — the card (no build step)
- `examples/home-dashboard.yaml` — example dashboard with the original floor plan
- `design/` — the original design files (open `Home Dashboard.dc.html` in a browser to preview)
