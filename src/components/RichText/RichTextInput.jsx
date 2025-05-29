import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Stack,
  IconButton,
  Button,
  Tooltip,
  Popover,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import LinkIcon from "@mui/icons-material/Link";
import PropTypes from "prop-types";
import Input from "../Input/Input";

// Disable porp-types check for this file since the props come from library
/* eslint react/prop-types: 0 */
function MenuBar({ editor, disabled }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [url, setUrl] = useState(null);
  const [urlError, setUrlError] = useState(null);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleClick = (event) => {
    const previousUrl = editor.getAttributes("link").href;
    setUrl(previousUrl);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const deleteLink = () => {
    try {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setAnchorEl(null);
      setUrl(null);
      setUrlError(null);
    } catch (e) {
      toast.error(e.message);
    }
  };

  const setLink = () => {
    if (!url) {
      setUrlError("Please enter a link");
      return;
    }
    if (
      !/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/.test(url)
    ) {
      setUrlError("Please enter a valid link");
      return;
    }

    // Add default protocol if missing
    const formattedUrl =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: formattedUrl, target: "_blank" })
        .run();
    } catch (e) {
      toast.error(e.message);
    }
    setUrl(null);
    setUrlError(null);
    setAnchorEl(null);
  };

  if (!editor) {
    return null;
  }

  return (
    <Stack
      direction="row"
      gap={1}
      flexWrap="wrap"
      sx={{
        p: 1,
        backgroundColor: "white",
        borderBottom: "1px solid #ccc",
        borderRadius: "4px 4px 0 0",
      }}
    >
      <Tooltip title="Undo" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run() || disabled}
            sx={{ width: 34 }}
          >
            <UndoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Redo" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run() || disabled}
            sx={{ width: 34 }}
          >
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Tooltip title="Bold" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can().chain().focus().toggleBold().run() || disabled
            }
            sx={{ width: 34 }}
          >
            <FormatBoldIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Italic" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can().chain().focus().toggleItalic().run() || disabled
            }
            sx={{ width: 34 }}
          >
            <FormatItalicIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Strike through" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can().chain().focus().toggleStrike().run() || disabled
            }
            sx={{ width: 34 }}
          >
            <StrikethroughSIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Link" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            aria-describedby={id}
            onClick={handleClick}
            sx={{ width: 34 }}
            disabled={disabled || !editor.state.selection}
          >
            <LinkIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Tooltip title="Header 1" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            sx={{ width: 34 }}
            disabled={disabled}
          >
            H1
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Header 2" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            sx={{ width: 34 }}
            disabled={disabled}
          >
            H2
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Header 3" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            sx={{ width: 34 }}
            disabled={disabled}
          >
            H3
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Paragraph" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setParagraph().run()}
            sx={{ width: 34 }}
            disabled={disabled}
          >
            P
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Bullet list" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            sx={{ width: 34 }}
            disabled={disabled}
          >
            <FormatListBulletedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Number list" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            sx={{ width: 34 }}
            disabled={disabled}
          >
            <FormatListNumberedIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Separator" enterDelay={500} leaveDelay={0}>
        <span>
          <IconButton
            size="small"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            sx={{ width: 34 }}
            disabled={disabled}
          >
            <HorizontalRuleIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          direction="column"
          gap={2}
          p={3}
          sx={{ minWidth: 320, width: 400 }}
        >
          <Input
            name="link"
            label="Link"
            value={url}
            error={urlError}
            onChange={handleUrlChange}
            type="text"
          />
          <Stack direction="row" gap={2} justifyContent="flex-end">
            <Button size="" variant="outlined" onClick={deleteLink}>
              Delete
            </Button>
            <Button size="" variant="contained" onClick={setLink}>
              Insert
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Stack>
  );
}
function RichTextInput({
  label,
  name,
  value,
  error,
  onChange,
  required,
  disabled,
}) {
  const editorInstance = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        protocols: ["http", "https"],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(":")
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ["ftp", "file", "mailto"];
            const protocol = parsedUrl.protocol.replace(":", "");

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === "string" ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }
            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
      }),
    ],
    content: value,
    autofocus: false,
    editable: !disabled,
    onUpdate({ editor }) {
      const newValue = editor.getHTML();
      const strippedValue = newValue.replace(/<[^>]*>/g, "").trim();
      const sanitizedValue = strippedValue === "" ? "" : newValue;
      onChange({ target: { name, value: sanitizedValue } });
    },
  });

  useEffect(() => {
    editorInstance.setEditable(!disabled);
  }, [disabled]);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          border: `1px solid ${error ? "#d32f2f" : "#ccc"}`,
          "&:focus-within": {
            outlineWidth: "1px",
            outlineStyle: "solid",
            outlineColor: error ? "#d32f2f" : "primary.main",
            outlineOffset: "-2px",
            borderColor: error ? "#d32f2f" : "primary.main",
            borderWidth: 1,
          },
          borderRadius: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            m: 2,
            ml: 0,
            backgroundColor: "#fff",
            px: 0.5,
            position: "absolute",
            top: "-26px",
            left: "8px",
            color: error ? "#d32f2f" : "grey.700",
          }}
        >
          {label}
          {required ? "*" : null}
        </Typography>
        <MenuBar editor={editorInstance} disabled={disabled} />
        <Box
          sx={{
            padding: 1,
          }}
        >
          <EditorContent editor={editorInstance} />
        </Box>
      </Box>
      {error && (
        <Typography color="error" variant="caption" ml={1} mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

RichTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RichTextInput;
