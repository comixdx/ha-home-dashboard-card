# Home Dashboard Card for Home Assistant

A Lovelace custom card that recreates the "Home Dashboard" design: floor plan with Lights / Temperature / Floor heating / Energy layers, quick scenes, per-room controls (lights with dimming, AC with modes and setpoint, floor heating) and today's energy chart.

Since v1.1 it also has light/dark/sun colour modes, a next-event calendar chip, a music chip, an indoor-comfort strip with dew point and an airing hint, a climate overview table, window sensors and contextual favourite tiles.

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
| `rooms[]` | `name`, `area`, `lights`, `temperature`, `humidity`, `power`, `climate` (AC), `floor_heating` (climate, switch or input_boolean), `floor_temperature`, `window` (one or more `binary_sensor`s), `ventilation: false` to skip the room in the airing hint, `plan: {x,y,w,h}`, `annex: {x,y,w,h}` for L-shaped rooms. |
| `color_mode` | `dark` (default), `light`, `auto` (follow the device/HA theme) or `sun` (dark while `sun.sun` is below the horizon). |
| `weather_entity` | Weather entity for the comfort strip; `outdoor_temperature` / `outdoor_humidity` sensors override its values. |
| `calendars` | Calendars for the "next event" chip. The dot turns amber while an event is running. |
| `media_players` | Speakers for the music chip. Playing beats a live physical input (TV/optical/line-in/Bluetooth), which beats paused; a group leader represents its group and shows a `+N` badge. Long titles scroll. |
| `favorites` | Contextual tiles (string or `{entity, name, icon, conditions, promote, tap_action}`); see below. |
| `comfort` | Comfort pill thresholds, default `{humid: 65, dry: 35, cold: 17, cool: 19, optimal: 25, warm: 27, band: [19, 23], range: [0, 35]}`. |
| `ventilation` | Airing hint, default `{humidity: 60, hours: 8}`. |
| `climate_table` | `expanded`, `collapsed` or `false`. Default: open on wide screens, collapsed on phones. |
| `show_comfort` | `false` hides the comfort strip. |

Rooms without `plan` are shown as tiles instead of a floor plan.

### Comfort strip & climate overview

- **Comfort pill:** humidity is checked first (above `humid` → Humid, below `dry` → Dry), then the average indoor temperature: Cold / Cool / Optimal / Warm / Hot. Its colour, and the card's tint, follow the indoor average.
- **Indoor vs outdoor bar** on a 0–35° scale with the comfort band highlighted, plus average humidity, dew point (Magnus formula) and the inside–outside difference.
- **Ventilation hint:** a room with window sensors is flagged when its windows are all closed and either its humidity is above `ventilation.humidity` with more moisture inside than outside (absolute humidity, > 1 g/m³), or the window has been closed longer than `ventilation.hours`.
- **Climate overview:** collapsible table of rooms with temperature, humidity, window and target; ▲/▼ mark the warmest/coldest and most humid/driest rooms (only when at least two rooms differ). The header shows the temperature spread, dew point and open-window count. Tap a row to open that room.

### Favourites

Tiles appear only while **all** their `conditions` hold, and active tiles move to the front (`promote: false` keeps their place). Conditions:

```yaml
conditions:
  - active                                   # the tile's own entity is on/running/playing…
  - { entity: sensor.temp, above: 18 }       # numeric (also: below, attribute)
  - { entity: input_select.mode, state: [home, guest] }   # or state_not
  - { after: "14:00", before: "21:00" }      # time window (may wrap past midnight)
  - or: [ { entity: sensor.temp, above: 24 }, active ]
```

Tap toggles lights, switches, fans and similar; runs scenes, scripts and buttons; opens more-info otherwise (`tap_action: toggle | run | more-info | none`).

### Credits

The comfort strip, climate overview, chips, favourites and colour modes in v1.1 are inspired by [Origami](https://github.com/hazymorning/origami) by hazymorning. No Origami code is included; the ideas were reimplemented from scratch for this card.

**Gestures:** tap toggles; long-press (or right-click) on a light, scene, AC/floor-heating header or circuit opens HA's more-info dialog. Setpoint taps are debounced, so several quick +/− presses send one command.

## HACS

Add this repository as a custom repository in HACS (category **Dashboard**), install, and HACS adds the resource for you.

## Repository layout

- `home-dashboard-card.js` — the card (no build step)
- `examples/home-dashboard.yaml` — example dashboard with the original floor plan
- `design/` — the original design files (open `Home Dashboard.dc.html` in a browser to preview)
